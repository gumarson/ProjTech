"use client";

import { ResponsiveBar } from "@nivo/bar";

interface NivoBarChartProps {
  data: any[];
  keys: string[];
  indexBy: string;
  layout?: "vertical" | "horizontal";
  colors?: {scheme: "nivo"} | string[] | ((bar: any) => string);
  tooltipFormatter?: (id: string, value: number, indexValue: string) => string;
}

const NivoBarChart = ({
  data,
  keys,
  indexBy,
  layout = "vertical",
  colors = { scheme: "nivo" }, 
  tooltipFormatter,
}: NivoBarChartProps) => {
  return (
    <div style={{ height: 400, width: "100%", backgroundColor: "lightgray" }}>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
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
