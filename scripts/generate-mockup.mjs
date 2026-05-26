import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { makeCircleProps, makeLockupLayout } from "./splash-constants.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const font = readFileSync(resolve(__dirname, "../assets/VarelaRound-Regular.ttf"));

// Phone frame
const W = 600;
const H = 1200;
const BORDER = 10;
const CORNER = 60;
const NOTCH_W = 120;
const NOTCH_H = 30;

// Screen content area
const SCREEN_W = W - BORDER * 2;
const SCREEN_H = H - BORDER * 2;

const ICON_BOX = 52; // ~2.17× header's 24px, scaled to fit mockup screen

// "breathe" at ~43px Varela Round with tracking-tight
const TEXT_W_EST = 163;

const c = makeCircleProps(ICON_BOX);
const l = makeLockupLayout(ICON_BOX, SCREEN_W, SCREEN_H, TEXT_W_EST);

// Offset by BORDER since content is inside the screen rect
const CX = BORDER + l.cx;
const CY = BORDER + l.cy;
const TEXT_X = BORDER + l.textX;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <!-- Phone body -->
  <rect x="0" y="0" width="${W}" height="${H}" rx="${CORNER}" ry="${CORNER}" fill="#1a1a1a"/>
  <!-- Screen -->
  <rect x="${BORDER}" y="${BORDER}" width="${SCREEN_W}" height="${SCREEN_H}"
    rx="${CORNER - BORDER}" ry="${CORNER - BORDER}" fill="white"/>
  <!-- Dynamic island -->
  <rect x="${(W - NOTCH_W) / 2}" y="${BORDER + 14}" width="${NOTCH_W}" height="${NOTCH_H}"
    rx="${NOTCH_H / 2}" ry="${NOTCH_H / 2}" fill="#1a1a1a"/>

  <!-- Splash content -->
  <circle
    cx="${CX.toFixed(2)}" cy="${CY.toFixed(2)}" r="${c.r.toFixed(2)}"
    stroke="#171717" stroke-width="${c.stroke.toFixed(2)}" fill="none"
    stroke-dasharray="${c.dash.toFixed(2)} ${c.opening.toFixed(2)}"
    stroke-dashoffset="${c.offset.toFixed(2)}"
    stroke-linecap="round"
  />
  <text
    x="${TEXT_X.toFixed(2)}" y="${CY.toFixed(2)}"
    dominant-baseline="central"
    font-family="Varela Round, sans-serif"
    font-size="${l.fontSize.toFixed(2)}"
    letter-spacing="${l.letterSpacing.toFixed(2)}"
    fill="#171717"
  >breathe</text>

  <!-- Home indicator -->
  <rect x="${(W - 120) / 2}" y="${H - BORDER - 22}" width="120" height="5"
    rx="3" ry="3" fill="#1a1a1a" opacity="0.25"/>
</svg>`;

const resvg = new Resvg(svg, { font: { fontBuffers: [font] } });
const png = resvg.render().asPng();
writeFileSync(resolve(__dirname, "../assets/splash-mockup.png"), png);
console.log("Mockup generated.");
