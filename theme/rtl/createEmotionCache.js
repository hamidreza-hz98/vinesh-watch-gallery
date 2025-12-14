import createCache from "@emotion/cache";
import rtlPlugin from "./rtlPlugin";
import { prefixer } from "stylis";

export default function createEmotionCache() {
  return createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
}