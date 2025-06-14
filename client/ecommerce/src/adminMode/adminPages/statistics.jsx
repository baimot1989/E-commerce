import { Container, Typography } from "@mui/material";
import BarChartStat from "../components/barChart";

const Statistics = () => {
    return ( 
        <>
        <Container style={{marginBottom: '10px'}}>
            <Typography variant="h5" style={{margin: '20px 0', textAlign: 'center'}}>Statistics</Typography>
            <BarChartStat />
        </Container>
        </>
     );
}
 
export default Statistics;