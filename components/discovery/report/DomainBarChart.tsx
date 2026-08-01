"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { RadarDataPoint } from "@/types/discoveryAssessment";

function scoreColor(score: number): string {
  if (score >= 80) return "#5b3df5"; // primary
  if (score >= 60) return "#63d5c7"; // accent
  return "#ffd447"; // secondary
}

export function DomainBarChart({ data }: { data: RadarDataPoint[] }) {
  const sorted = [...data].sort((a, b) => b.score - a.score);

  return (
    <div className="rounded-[28px] bg-surface p-7 shadow-sm shadow-black/5">
      <p className="text-xs font-bold uppercase tracking-wider text-primary">
        Peringkat Skor per Domain
      </p>
      <p className="mt-1 text-xs text-text-muted">
        Urutan domain dari yang paling menonjol ke yang paling potensial dikembangkan.
      </p>
      <div className="mt-4 h-[560px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sorted} layout="vertical" margin={{ left: 8, right: 24 }}>
            <CartesianGrid horizontal={false} stroke="#ece6d8" />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: "#6b6a85", fontSize: 10 }} />
            <YAxis
              type="category"
              dataKey="subject"
              width={140}
              tick={{ fill: "#272640", fontSize: 11 }}
            />
            <Bar dataKey="score" radius={[0, 8, 8, 0]}>
              {sorted.map((entry, index) => (
                <Cell key={index} fill={scoreColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
