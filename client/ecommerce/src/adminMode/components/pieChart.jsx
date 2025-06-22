import * as React from "react"
import { Label, Pie, PieChart, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useFetchData } from "../../hooks/fetchData";
import { Container, Typography } from "@mui/material";

const chartData = [
    { browser: "chrome", visitors: 275, fill: "hsl(var(--chart-1))" },
    { browser: "safari", visitors: 200, fill: "hsl(var(--chart-2))" },
    { browser: "firefox", visitors: 287, fill: "hsl(var(--chart-3))" },
    { browser: "edge", visitors: 173, fill: "hsl(var(--chart-4))" },
    { browser: "other", visitors: 190, fill: "hsl(var(--chart-5))" },
]

const PieChartTotalSales = () => {

    // Fetch products from API
    const { data: products = [], isloading: loadingProducts } = useFetchData('http://localhost:3000/products');

    const salesSummary = products.map((product, index) => {
        const totalSales = product.boughtBy?.reduce((sum, entry) => sum + entry.quantity, 0) || 0;
        console.log(typeof (totalSales))
        return {
            title: product.title,
            totalSales,
            fill: `hsl(var(--chart-${index + 1}))`
        };
    });
    console.log(salesSummary)

    const totalVisitors = React.useMemo(() => {
        return salesSummary.reduce((acc, curr) => acc + curr.totalSales, 0)
    }, [salesSummary])

    //   console.log(totalVisitors)
    return (
        <>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>Total sold Products</Typography>
            <ResponsiveContainer width="100%" height={300} mb>
                <PieChart width={600} height={300}>
                    <Tooltip />
                    <Legend
                        layout="horizontal"
                        align="center"
                        verticalAlign="bottom"
                    />

                    <Pie
                        data={salesSummary}
                        dataKey="totalSales"
                        nameKey="title"
                        innerRadius={60}
                        strokeWidth={5}
                    >
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                style={{ fontSize: 24, fontWeight: 'bold', fill: '#333' }}
                                            >
                                                {totalVisitors.toLocaleString()}
                                            </text>
                                            <text
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                style={{ fontSize: 14, fill: '#888' }}
                                            >
                                                Sales
                                            </text>
                                        </text>
                                    )
                                }
                            }}
                        />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </>
    );
}

export default PieChartTotalSales;