import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { makeCircleProps } from "./splash-constants.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SIZE = 1024;
const ICON_BOX = 800; // symbol fills ~60% of the icon area

const c = makeCircleProps(ICON_BOX);
const cx = SIZE / 2;
const cy = SIZE / 2;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="#93c5fd"/>
  <circle
    cx="${cx}" cy="${cy}" r="${c.r.toFixed(2)}"
    stroke="white" stroke-width="${c.stroke.toFixed(2)}" fill="none"
    stroke-dasharray="${c.dash.toFixed(2)} ${c.opening.toFixed(2)}"
    stroke-dashoffset="${c.offset.toFixed(2)}"
    stroke-linecap="round"
  />
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: SIZE },
});

const png = resvg.render().asPng();
const outDir = resolve(__dirname, "../ios/App/App/Assets.xcassets/AppIcon.appiconset");
writeFileSync(`${outDir}/AppIcon-512@2x.png`, png);
console.log("App icon generated.");
