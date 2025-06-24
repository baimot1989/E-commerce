// import { Container, Typography } from "@mui/material";
// import TableComp from "../../components/tableComp";
// import { useFetchData } from "../../hooks/fetchData";
// import { useSelector } from "react-redux";

// const MyOrders = () => {

//     const user = useSelector((state) => state.auth.user);

//      const { data, error, isloading } = useFetchData('http://localhost:3000/orders');

//      const userOrders = data.filter(item => item.customerFullName === `${user.firstName} ${user.lastName}`).map(
//         ite => ite.productsList
//      )
//      const allProducts = userOrders.flat();

//      const columns = [
//         { label: "Title", accessor: "productName" },
//         { label: "Quantity", accessor: "quantity" },
//         { label: "Total", accessor: "total" },
//         { label: "Date", accessor: "date" },
//     ];


//     return ( 
//         <>
//         <Container>
//             <Typography variant="h6" my={2} style={{textAlign: 'center'}}>My Orders</Typography>
//             <TableComp columns={columns} data={allProducts}></TableComp>
//         </Container>
//         </>
//      );
// }
 
// export default MyOrders;

import { Container, Typography } from "@mui/material";
import TableComp from "../../components/tableComp";
import { useFetchData } from "../../hooks/fetchData";
import { useSelector } from "react-redux";

const MyOrders = () => {
    // Get the logged-in user from Redux store
    const user = useSelector((state) => state.auth.user);

    // Fetch all orders from the backend
    const { data, error, isloading } = useFetchData('http://localhost:3000/orders');

    // Handle loading and error states
    if (isloading) {
        return (
            <Container>
                <Typography align="center" my={2}>Loading your orders...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography align="center" my={2} color="error">Failed to load orders.</Typography>
            </Container>
        );
    }

    // Filter orders that belong to the logged-in user
    const userOrders = data
        ?.filter(order => order.customerFullName === `${user.firstName} ${user.lastName}`)
        .map(order => order.productsList) || [];

    // Flatten the product lists into a single array
    const allProducts = userOrders.flat();

    // Define table columns
    const columns = [
        { label: "Title", accessor: "productName" },
        { label: "Quantity", accessor: "quantity" },
        { label: "Total", accessor: "total" },
        { label: "Date", accessor: "date" },
    ];

    return (
        <Container sx={{mb: 4}}>
            <Typography variant="h6" align="center" my={2}>
                My Orders
            </Typography>
            <TableComp columns={columns} data={allProducts} />
        </Container>
    );
};

export default MyOrders;
