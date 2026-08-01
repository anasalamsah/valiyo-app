import { Svg, Polygon, Circle, Line } from "@react-pdf/renderer";
import type { RadarDataPoint } from "@/types/discoveryAssessment";

const SIZE = 240;
const CENTER = SIZE / 2;
const MAX_RADIUS = 95;

function pointFor(index: number, total: number, valuePercent: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const radius = (valuePercent / 100) * MAX_RADIUS;
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  };
}

/**
 * Hand-drawn radar/spider chart using @react-pdf/renderer's native SVG
 * primitives. recharts (used on the web report) renders to a browser DOM
 * SVG and can't run inside react-pdf's own renderer, so this recomputes
 * the same shape from the same `radarData` using plain trigonometry.
 */
export function RadarChartSvg({ data }: { data: RadarDataPoint[] }) {
  const total = data.length;
  if (total === 0) return null;

  const polygonPoints = data
    .map((d, i) => {
      const p = pointFor(i, total, d.score);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      {/* Grid rings at 25/50/75/100% */}
      {[0.25, 0.5, 0.75, 1].map((fraction) => (
        <Circle
          key={fraction}
          cx={CENTER}
          cy={CENTER}
          r={MAX_RADIUS * fraction}
          stroke="#ece6d8"
          strokeWidth={0.75}
          fill="none"
        />
      ))}

      {/* Axis lines from center to each domain's max point */}
      {data.map((_, i) => {
        const outer = pointFor(i, total, 100);
        return (
          <Line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={outer.x}
            y2={outer.y}
            stroke="#ece6d8"
            strokeWidth={0.75}
          />
        );
      })}

      {/* Score polygon */}
      <Polygon
        points={polygonPoints}
        stroke="#5b3df5"
        strokeWidth={1.5}
        fill="#5b3df5"
        fillOpacity={0.25}
      />
    </Svg>
  );
}
