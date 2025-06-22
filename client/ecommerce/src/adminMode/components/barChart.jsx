import { Box, Container, MenuItem, Select, Typography } from "@mui/material";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Rectangle, YAxis, Legend, ResponsiveContainer } from "recharts"
import { useFetchData } from "../../hooks/fetchData";
import { useState } from "react";

const BarChartStat = () => {

    const { data: products } = useFetchData('http://localhost:3000/products');
    const { data: users } = useFetchData('http://localhost:3000/users');

    const [selectedUser, setSelectedUser] = useState('')
    const [charData, setCharData] = useState([]);
    const handleUserSelected = (e) => {
        const selectedName = e.target.value.toLowerCase();
      
        // Initialize an array to store the chart data for this user
        const userBought = products.reduce((acc, product) => {
          const matches = product.boughtBy?.filter(item => 
            item.fullName.toLowerCase() === selectedName
          );
          if (matches?.length) {
            // Sum up the total quantity of this product bought by the user
            const total = matches.reduce((sum, item) => sum + item.quantity, 0);
      
            acc.push({
              name: product.title,          // Product title (used as X-axis label)
              quantity: total,              // Total quantity bought (used as Y-axis value)
              fullName: matches[0].fullName // User's full name (optional, not used in chart but kept for clarity)
            });
          }
          return acc;
        }, []);
        setSelectedUser(e.target.value);
        setCharData(userBought);
      };
      

    return (
        <>
            <Container maxWidth="xl" sx={{ width: {xs: '100%', md: "70%", xl: "80%" }, margin: '10px auto' }}>
                <Typography style={{ marginBottom: '10px' }} variant="h6">Products quantity per custmor</Typography>
               <Box sx={{ margin: '20px auto', width: {xs: '100%', md: "70%", xl: "50%" } }}>
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
                        <BarChart accessibilityLayer width={600} height={300} data={charData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <YAxis label={{ value: 'Qty', angle: -90, position: 'insideLeft', offset: 10 }} />
                            <Bar dataKey="quantity" nameKey="name" fill={'hsl(var(--chart-1))'} radius={4} />
                            <Tooltip cursor={{ fill: 'transparent' }} />
                            <Legend 
                             layout="horizontal"
                             align="center"
                             verticalAlign="bottom"
                             wrapperStyle={{ marginTop: 10 }}
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