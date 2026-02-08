import { Server } from "@hocuspocus/server";

// Only for development. For production see server.js
if (import.meta.env.DEV) {
    const server = new Server({
        name: "hocuspocus",
        port: 5175,
        timeout: 30000,
        debounce: 5000,
        maxDebounce: 30000,
        quiet: true,
    });

    server.listen();
}

// Dummy request handler
export default async function fetch(_request: Request): Promise<Response> {
    return new Response("Hello, world!", {
        status: 200,
    });
}
