"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import type { RadarDataPoint } from "@/types/discoveryAssessment";

export function RadarChartCard({ data }: { data: RadarDataPoint[] }) {
  return (
    <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
      <p className="text-xs font-bold uppercase tracking-wider text-primary">
        Peta 18 Domain Perkembangan
      </p>
      <div className="mt-4 h-80 w-full sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke="#ece6d8" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#6b6a85", fontSize: 10 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: "#6b6a85", fontSize: 9 }}
              tickCount={5}
            />
            <Radar
              dataKey="score"
              stroke="#5b3df5"
              fill="#5b3df5"
              fillOpacity={0.25}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
