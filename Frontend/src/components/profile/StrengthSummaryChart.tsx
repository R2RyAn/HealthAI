
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";

interface StrengthSummaryChartProps {
  chartData: {
    name: string;
    value: number;
    change: string;
  }[];
}

const StrengthSummaryChart = ({ chartData }: StrengthSummaryChartProps) => {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <h3 className="font-medium mb-4">Strength Progress</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickMargin={10}
              axisLine={false}
            />
            <YAxis 
              domain={[0, 'auto']}
              tick={{ fontSize: 12 }}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip 
              formatter={(value, name) => [`${value} lbs`, name]}
              labelFormatter={(value) => `${value}`}
            />
            <Bar 
              dataKey="value" 
              name="Max Weight (lbs)" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StrengthSummaryChart;
