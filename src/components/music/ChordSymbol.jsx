import { useEffect, useRef, useState } from "react";
import ChordAnalysis from "../../classes/ChordAnalysis";

export default function ChordSymbol({ analysis, x, y, move }) {
  analysis =
    typeof analysis === "string"
      ? ChordAnalysis.fromString(analysis)
      : analysis;

  const gRef = useRef();

  // The text elements align their left sides at the desired center, so readjust.
  // !!! Because this runs via useEffect, during development, hot reloading of this component keeps shifting the text elements left. However, that should only happen in this file, since otherwise the entire component is created from scratch.
  useEffect(() => {
    const textElement = gRef.current.firstChild;

    const bbox = textElement.getBBox();

    textElement.setAttribute("x", bbox.x - bbox.width / 4);
  });

  return (
    <g ref={gRef} className="pointer-events-auto font-text outline-red-100">
      <text x={x} y={y}>
        {analysis ? (
          <>
            <tspan>
              {analysis.accidental && (analysis.accidental === "#" ? "♯" : "♭")}
              {analysis.roman}
            </tspan>
            <tspan textAnchor="middle" dx="1.5" dy="-10" className="text-[50%]">
              {analysis.arabic?.at(0)}
            </tspan>
            <tspan textAnchor="end" y={y} className="text-[50%]">
              {analysis.arabic?.at(1)}
            </tspan>
            <tspan dx={-4.2} y={y}>
              {analysis.secondary}
            </tspan>
          </>
        ) : (
          "·"
        )}
      </text>
    </g>
  );
}
