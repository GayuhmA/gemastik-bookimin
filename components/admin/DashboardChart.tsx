"use client";

import { adminChartData } from "@/data/admin";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

export default function DashboardChart() {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 mt-8">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={adminChartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorMakam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4ADE80" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorAddon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={true}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Area
              type="linear"
              dataKey="makam"
              stroke="#4ADE80"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMakam)"
              activeDot={{ r: 6 }}
            />
            <Area
              type="linear"
              dataKey="addon"
              stroke="#60A5FA"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAddon)"
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
