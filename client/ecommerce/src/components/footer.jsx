import { Box, Container, Grid, Typography } from "@mui/material";
import CopyrightIcon from '@mui/icons-material/Copyright';
const Footer = () => {
    return (
        <>
            <Box component= 'footer' sx={{ backgroundColor: "#4caf50", color: 'white', padding: '10px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 'auto' }}>
                <CopyrightIcon />
                <Typography> All Right reserved </Typography>
            </Box>
        </>
    );
}

export default Footer;