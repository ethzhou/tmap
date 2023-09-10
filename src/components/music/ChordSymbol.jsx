import { parseStringChordSymbol } from "../../utils/musicUtils";
import { COLOR_CHORD_SELECT } from "../../utils/utils";

export default function ChordSymbol({ symbol, x, y, color }) {
  symbol = ((typeof symbol) === "string") ? parseStringChordSymbol(symbol) : symbol;

  return (
    <g className="chordsymbol" fill={color ?? "#000"} stroke={color ?? "#000"} style={{fontSize: 20}}>
      <text x={x} y={y}>
      {
        symbol ? <>
          <tspan>
            {symbol.accidental && (symbol.accidental === "#" ? "♯" : "♭")}{symbol.roman}
          </tspan>
          <tspan dy="-10" style={{fontSize: 10}}>
            {symbol.arabic?.at(0)}
          </tspan>
          <tspan dx="-5.5" y={y} style={{fontSize: 10}}>
            {symbol.arabic?.at(1)}
          </tspan>
          <tspan y={y}>
            {symbol.secondary}
          </tspan>
        </> : "."
      }
      </text>
    </g>
  )
}