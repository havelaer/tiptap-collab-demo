import type { RouterClient } from "@orpc/server";
import * as sources from "./routes/sources";

export const router = {
    sources,
};

export type RPCClient = RouterClient<typeof router>;
