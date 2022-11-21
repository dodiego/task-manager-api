import { startServer } from "server";
import { logFatal } from "shared/logger";

async function run(): Promise<void> {
  await startServer();
}

run().catch((e) => {
  logFatal(e);
  process.exit(1);
});
