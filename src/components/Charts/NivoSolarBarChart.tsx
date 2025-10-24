"use client";

import { ResponsiveBar } from "@nivo/bar";

export interface NivoBarChartProps {
  data: any[];
  keys: string[];
  indexBy: string;
  layout?: "horizontal" | "vertical";
  colors?: string[];
  tooltipFormatter?: (id: string, value: number, indexValue: string) => string;
  margin?: { top: number; right: number; bottom: number; left: number }; // Adicione esta linha
}

const industrialColors = [
  "#1e293b", // slate-800
  "#334155", // slate-700
  "#0f172a", // slate-900
  "#2563eb", // accent blue
  "#64748b", // slate-500
  "#111827", // near-black
];

const NivoBarChart = ({
  data,
  keys,
  indexBy,
  layout = "vertical",
  colors = industrialColors,  
  tooltipFormatter,
  margin = { top: 20, right: 20, bottom: 40, left: 60 }, // Valor padrão
}: NivoBarChartProps) => {
  return (
    <div style={{ height: 400, width: "100%", backgroundColor: "lightgray" }}>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={margin}
        padding={0.3}
        layout={layout}
        colors={colors}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        theme={{
          tooltip: {
            container: {
              background: "#f9fafb",
              color: "#1f2937", 
              fontSize: 14,
              borderRadius: "6px",
              padding: "10px",
            },
          },
        }}
        
        axisLeft={{
          legend: "Energia",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        axisBottom={{
          legend: "Potencial Solar (kWh/m²)",
          legendPosition: "middle",
          legendOffset: 40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#ffff"
        animate={true}
        motionConfig="wobbly"
        tooltip={({ id, value, indexValue }) => (
          <div
            style={{
              background: "#f9fafb",
              color: "#1f2937", 
              fontSize: 14,
              borderRadius: "6px",
              padding: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)", 
            }}
          >
            <strong>
              {tooltipFormatter
                ? tooltipFormatter(String(id), value as number, String(indexValue))
                : `${indexValue}: ${value} kWh/m²`}
            </strong>
          </div>
        )}
      />
    </div>
  );
};

export default NivoBarChart;
