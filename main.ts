// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.
/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "std/dotenv/load.ts";

import { start } from "fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

Deno.cron("sample cron", "0 0 * * *", () => {
  console.log("hi");
});

await start(manifest, { plugins: [twindPlugin(twindConfig)] });
