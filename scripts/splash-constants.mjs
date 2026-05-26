// Source of truth: favicon.svg + header in root.tsx
// favicon: viewBox 32x32, r=10, stroke-width=3, dasharray="53.2 9.6", dashoffset="10.9"
// header:  w-6 h-6 (24px icon box), text-xl (20px), gap-1 (4px), tracking-tight (-0.025em)

export const FAVICON = {
  viewbox: 32,
  r: 10,
  stroke: 3,
  dash: 53.2,
  gap: 9.6,
  offset: 10.9,
};

export const HEADER = {
  iconBox: 24,
  fontSize: 20,
  gap: 4,
  letterSpacing: -0.025, // em (tracking-tight)
};

export function makeCircleProps(iconBox) {
  const svgScale = iconBox / FAVICON.viewbox;
  const r = FAVICON.r * svgScale;
  const stroke = FAVICON.stroke * svgScale;
  const dashScale = r / FAVICON.r;
  return {
    r,
    stroke,
    dash: FAVICON.dash * dashScale,
    opening: FAVICON.gap * dashScale,
    offset: FAVICON.offset * dashScale,
  };
}

export function makeLockupLayout(iconBox, canvasW, canvasH, textWidthEst) {
  const scale = iconBox / HEADER.iconBox;
  const fontSize = HEADER.fontSize * scale;
  const gap = HEADER.gap * scale;
  const letterSpacing = HEADER.letterSpacing * fontSize;
  const totalW = iconBox + gap + textWidthEst;
  const startX = (canvasW - totalW) / 2;
  return {
    scale,
    fontSize,
    gap,
    letterSpacing,
    startX,
    cx: startX + iconBox / 2,
    cy: canvasH / 2,
    textX: startX + iconBox + gap,
  };
}
