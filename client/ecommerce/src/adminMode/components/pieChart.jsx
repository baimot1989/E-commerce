import * as React from "react"
import { Label, Pie, PieChart, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useFetchData } from "../../hooks/fetchData";
import { Container, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL;

const PieChartTotalSales = () => {

    // Fetch all products from the API
    const { data: products = [], isloading: loadingProducts } =
        useFetchData(`${API_URL}/products`);

    // Build chart data and calculate total sales per product
    const salesSummary = products.map((product, index) => {
        const totalSales =
            product.boughtBy?.reduce(
                (sum, entry) => sum + entry.quantity,
                0
            ) || 0;

        return {
            // Shorten long product titles for better chart display
            title:
                product.title.length > 20
                    ? product.title.slice(0, 10) + "..."
                    : product.title,
            totalSales,

            // Assign a chart color based on the product index
            fill: `hsl(var(--chart-${index + 1}))`
        };
    });

    // Calculate the total number of items sold across all products
    const totalItemsSold = React.useMemo(() => {
        return salesSummary.reduce(
            (acc, curr) => acc + curr.totalSales,
            0
        );
    }, [salesSummary]);

    return (
        <Container maxWidth='md' >
            <Typography variant="h6" sx={{ textAlign: 'center' }}>Total sold Products</Typography>
            <ResponsiveContainer width="100%" height={350} mb>
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
                                                {totalItemsSold.toLocaleString()}
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
        </Container>
    );
}

export default PieChartTotalSales;