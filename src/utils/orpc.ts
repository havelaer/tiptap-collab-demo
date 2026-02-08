import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { router } from "../.rpc/router";

const link = new RPCLink({
    url: `${window.location.origin}/rpc`,
});

export const client: RouterClient<typeof router> = createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);
