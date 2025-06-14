import { Container, Typography } from "@mui/material";
import TableComp from "../../components/tableComp";
import { useFetchData } from "../../hooks/fetchData";
import { useSelector } from "react-redux";

const MyOrders = () => {

    const user = useSelector((state) => state.auth.user);

     const { data, error, isloading } = useFetchData('http://localhost:3000/orders');

     const userOrders = data.filter(item => item.customerFullName === `${user.firstName} ${user.lastName}`).map(
        ite => ite.productsList
     )
     const allProducts = userOrders.flat();

     const columns = [
        { label: "Title", accessor: "productName" },
        { label: "Quantity", accessor: "quantity" },
        { label: "Total", accessor: "total" },
        { label: "Date", accessor: "date" },
    ];


    return ( 
        <>
        <Container>
            <Typography variant="h6" my={2} style={{textAlign: 'center'}}>My Orders</Typography>
            <TableComp columns={columns} data={allProducts}></TableComp>
        </Container>
        </>
     );
}
 
export default MyOrders;