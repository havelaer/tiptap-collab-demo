import { Hocuspocus } from '@hocuspocus/server';
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { createNodeWebSocket } from '@hono/node-ws';
import { Hono } from "hono";
import { compress } from "hono/compress";
import { ssr, ssrContext } from "./dist/index.js";

const app = new Hono();

app.use(compress());

app.use(serveStatic({ root: "./dist/client" }));

const hocuspocus = new Hocuspocus({
  name: "hocuspocus-ams1-01",
  timeout: 30000,
  debounce: 5000,
  maxDebounce: 30000,
  quiet: true,
})

const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app })

app.get(
  '/hocuspocus',
  upgradeWebSocket((c) => ({
    onOpen(_evt, ws) {
      hocuspocus.handleConnection(ws.raw, c.req.raw)
    },
  })),
)

app.use((c) => ssr(c.req.raw, ssrContext));

const server = serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
  hocuspocus.hooks('onListen', {
    instance: hocuspocus,
    configuration: hocuspocus.configuration,
    port: info.port,
  })
});

injectWebSocket(server)
