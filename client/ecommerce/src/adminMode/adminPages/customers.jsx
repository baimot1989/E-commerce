import { width } from "@mui/system";
import Table from "../../components/table";
import TableComp from "../../components/tableComp";
import { useFetchData } from "../../hooks/fetchData"
import { Container, Typography } from "@mui/material";
const Customers = () => {

    const { data:users } = useFetchData('http://localhost:3000/users');
    const { data:products } = useFetchData('http://localhost:3000/products');

    const columns = [ // columns for table component
      { label: "Full Name", accessor: "fullName" },
      { label: "Joined At", accessor: "joinedAt" },
      {
        label: "Products Bought",
        accessor: "details",
        isNested: true,
        nestedColumns: [
          { label: "Product", accessor: "title" },
          { label: "Quantity", accessor: "quantity" },
          { label: "Date", accessor: "date" },
        ],
      },
    ];

    // user  details  for the table component
    const customersData = users.map(user => { // Logic that creates a data object that contains details about the user and the details they have purchased
        const fullName = `${user.firstName} ${user.lastName}`;
        const userPurchases = [];
      
        products.forEach(product => {
          product.boughtBy?.forEach(buyer => {
            if (buyer.fullName === fullName) {
              userPurchases.push({
                title: product.title,
                quantity: buyer.quantity,
                date: buyer.date,
              });
            }
          });
        });
        
        return {
          fullName,
          joinedAt: user.joinedAt,
          details: userPurchases
        };
      });
   
    return (
        <>
            <Container style={{marginBottom: '10px'}}>
                <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '20px' }}>Customers</Typography>
                <TableComp  columns={columns} data={customersData} />
            </Container>
        </>
    );
}

export default Customers;