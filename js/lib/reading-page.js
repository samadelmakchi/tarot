import { falPage } from "./ui.js";
import { runSpread } from "./tarot.js";

export function makeTarotPage(meta, config) {
  return function page(mount) {
    const box = falPage(mount, meta, () => {});
    runSpread(box, { ...config, title: meta.title });
  };
}
