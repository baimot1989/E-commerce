import { Container, Typography } from "@mui/material";
import BarChartStat from "../components/barChart";
import PieChartTotalSales from "../components/pieChart";

const Statistics = () => {
    return (
        <>
            <Container style={{ marginBottom: '10px' }}>
                <Typography variant="h5" style={{ margin: '20px 0'}}>Statistics</Typography>
                <PieChartTotalSales />
                <BarChartStat />

            </Container>
        </>
    );
}

export default Statistics;