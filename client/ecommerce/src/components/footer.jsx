import { Box, Container, Grid, Typography } from "@mui/material";
import CopyrightIcon from '@mui/icons-material/Copyright';
const Footer = () => {
    return (
        <>
            <Box component='footer'
                  sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    py: 2,
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    zIndex: 1300, // above other content
                  }}>
                <CopyrightIcon />
                <Typography> All Right reserved </Typography>
            </Box>
        </>
    );
}

export default Footer;