import { Container, MenuItem, Select, Typography } from "@mui/material";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Rectangle, YAxis, Legend } from "recharts"
import { useFetchData } from "../../hooks/fetchData";
import { useState } from "react";
const BarChartStat = () => {

    const { data: products } = useFetchData('http://localhost:3000/products');
    const { data: users } = useFetchData('http://localhost:3000/users');

    const [selectedUser, setSelectedUser] = useState('')
    const [charData, setCharData] = useState([]);

    const handleUserSelected = (e) => {
        const userBought = []
        setSelectedUser(e.target.value)
        let userData;
        products.forEach(product => {
            const { boughtBy } = product
            userData = boughtBy.find(item => item.fullName == e.target.value);
            if (userData) {
                userData.name = product.title;
                userBought.push(userData)
            }
        })
        setCharData(userBought);
    };

    return (
        <>
            <Container style={{ width: '80%', margin: '0 auto' }}>
                <Typography style={{ marginBottom: '10px' }} variant="p">Products quantity per custmor</Typography>
                <Select
                    fullWidth
                    value={selectedUser}
                    onChange={(e) => handleUserSelected(e)}
                    displayEmpty
                    style={{ margin: '20px' }}
                >
                    <MenuItem value="" disabled>
                        Select Category
                    </MenuItem>
                    {users.map(user => (
                        <MenuItem key={user._id} value={`${user.firstName} ${user.lastName}`}>
                            {user.userName}
                        </MenuItem>
                    ))}
                </Select>

                {charData.length ? 
                    <BarChart accessibilityLayer width={600} height={300} data={charData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        // tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis label={{ value: 'Qty', angle: -90, position: 'insideLeft', offset: 10 }} />
                        <Bar dataKey="quantity" fill={'hsl(var(--chart-1))'} radius={4} />
                        <Tooltip cursor={{ fill: 'transparent' }} />
                        <Legend />
                    </BarChart>
                    : <Typography variant="p">No chart data available.</Typography>
                    }
            </Container>
        </>
    );
}

export default BarChartStat;