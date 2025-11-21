import { setupWorker } from "msw/browser";
import { apis } from "./apis";

const worker = setupWorker(...apis);

const startWorker = async () => {
  await worker.start({
    onUnhandledRequest: "error",
  });
};

export default startWorker;
