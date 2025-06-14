import { Container, Grid, Typography } from "@mui/material";
import CopyrightIcon from '@mui/icons-material/Copyright';
const Footer = () => {
    return (
        <>
            <Container maxWidth='xl' style={{ backgroundColor: '#1a237e', padding: '10px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 'auto' }}>
                <CopyrightIcon />
                <Typography> All Right reserved </Typography>
            </Container>
        </>
    );
}

export default Footer;