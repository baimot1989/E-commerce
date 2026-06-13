import { Box, Container, MenuItem, Select, Typography } from "@mui/material";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Rectangle, YAxis, Legend, ResponsiveContainer, Cell } from "recharts"
import { useFetchData } from "../../hooks/fetchData";
import { useState } from "react";
import { padding } from "@mui/system";

const API_URL = import.meta.env.VITE_API_URL;

const BarChartStat = () => {

    // Fetch products and users data from API
    const { data: products } = useFetchData(`${API_URL}/products`);
    const { data} = useFetchData(`${API_URL}/users`);
    const users = data.filter(user => user.userName !== 'Baimot')

    const [selectedUser, setSelectedUser] = useState('');
    const [charData, setCharData] = useState([]);

    // Handle user selection and build chart data for purchases
    const handleUserSelected = (e) => {
        const selectedName = e.target.value.toLowerCase();

        // Extract and aggregate all products purchased by the selected user
        const userBought = products.reduce((acc, product) => {
            const matches = product.boughtBy?.filter(item =>
                item.fullName.toLowerCase() === selectedName
            );

            // If user purchased this product, calculate total quantity
            if (matches?.length) {
                const total = matches.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                );

                acc.push({
                    // Product name for chart display
                    name:
                        product.title.length > 20
                            ? product.title.slice(0, 10) + "..."
                            : product.title,

                    // Total quantity purchased by the user
                    quantity: total,

                    // User identity (optional reference)
                    fullName: matches[0].fullName,
                });
            }

            return acc;
        }, []);

        // Store selected user and generated chart data
        setSelectedUser(e.target.value);
        setCharData(userBought);
    };


    return (
        <>
            <Container maxWidth="xl" sx={{ width: { xs: '100%', md: "70%", xl: "80%" }, margin: '10px auto' }}>
                <Typography sx={{ marginBottom: '10px' }} variant="h6">Products quantity per custmor</Typography>
                <Box sx={{ margin: '20px auto', width: { xs: '100%', md: "70%", xl: "50%" } }}>
                    <Select
                        fullWidth
                        value={selectedUser}
                        onChange={(e) => handleUserSelected(e)}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Select User
                        </MenuItem>
                        {users.map(user => (
                            <MenuItem key={user._id} value={`${user.firstName} ${user.lastName}`}>
                                {user.userName}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>

                {charData.length ?

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart accessibilityLayer width={600} height={300} data={charData} style={{ padding: '10px' }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <YAxis label={{ value: 'Qty', angle: -90, position: 'insideLeft', offset: 10 }} />
                            <Bar dataKey="quantity" nameKey="name" radius={4}>
                                {
                                    charData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`hsl(${(index * 60) % 360}, 70%, 60%)`} />
                                    ))
                                }
                            </Bar>
                            <Tooltip cursor={{ fill: 'transparent' }} />
                            <Legend
                                layout="horizontal"
                                align="center"
                                verticalAlign="bottom"
                                payload={charData.map((entry, index) => ({
                                    value: entry.name,                // Label in legend
                                    type: 'square',                   // Shape (square, line, circle, etc.)
                                    color: `hsl(${(index * 60) % 360}, 70%, 60%)`, // Match the bar color
                                }))}
                            />
                        </BarChart>
                    </ResponsiveContainer>

                    : <Typography variant="p">No chart data available.</Typography>
                }
            </Container>
        </>
    );
}

export default BarChartStat;