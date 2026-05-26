import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { makeCircleProps, makeLockupLayout } from "./splash-constants.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const font = readFileSync(resolve(__dirname, "../assets/VarelaRound-Regular.ttf"));

const SIZE = 2732;
const ICON_BOX = 180; // 7.5× the header's 24px icon

// "breathe" at ~150px Varela Round with tracking-tight
const TEXT_W_EST = 570;

const c = makeCircleProps(ICON_BOX);
const l = makeLockupLayout(ICON_BOX, SIZE, SIZE, TEXT_W_EST);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="white"/>
  <circle
    cx="${l.cx.toFixed(2)}" cy="${l.cy.toFixed(2)}" r="${c.r.toFixed(2)}"
    stroke="#171717" stroke-width="${c.stroke.toFixed(2)}" fill="none"
    stroke-dasharray="${c.dash.toFixed(2)} ${c.opening.toFixed(2)}"
    stroke-dashoffset="${c.offset.toFixed(2)}"
    stroke-linecap="round"
  />
  <text
    x="${l.textX.toFixed(2)}" y="${l.cy.toFixed(2)}"
    dominant-baseline="central"
    font-family="Varela Round, sans-serif"
    font-size="${l.fontSize.toFixed(2)}"
    letter-spacing="${l.letterSpacing.toFixed(2)}"
    fill="#171717"
  >breathe</text>
</svg>`;

const resvg = new Resvg(svg, {
  font: { fontBuffers: [font] },
  fitTo: { mode: "width", value: SIZE },
});

const png = resvg.render().asPng();
const outDir = resolve(__dirname, "../ios/App/App/Assets.xcassets/Splash.imageset");
writeFileSync(`${outDir}/splash-2732x2732.png`, png);
writeFileSync(`${outDir}/splash-2732x2732-1.png`, png);
writeFileSync(`${outDir}/splash-2732x2732-2.png`, png);
console.log("Splash screens generated.");
