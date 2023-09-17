import ChordAnalysis from "../../classes/ChordAnalysis";
import { COLOR_CHORD_SELECT } from "../../utils/utils";

export default function ChordSymbol({ analysis, x, y, color }) {
  analysis = (typeof analysis === "string") ? ChordAnalysis.fromString(analysis) : analysis;

  return (
    <g className="chordsymbol" fill={color ?? "#000"} stroke={color ?? "#000"} style={{fontSize: 20}}>
      <text x={x} y={y}>
      {
        analysis ? <>
          <tspan>
            {analysis.accidental && (analysis.accidental === "#" ? "♯" : "♭")}{analysis.roman}
          </tspan>
          <tspan dy="-10" style={{fontSize: 10}}>
            {analysis.arabic?.at(0)}
          </tspan>
          <tspan dx="-5.5" y={y} style={{fontSize: 10}}>
            {analysis.arabic?.at(1)}
          </tspan>
          <tspan y={y}>
            {analysis.secondary}
          </tspan>
        </> : "."
      }
      </text>
    </g>
  )
}