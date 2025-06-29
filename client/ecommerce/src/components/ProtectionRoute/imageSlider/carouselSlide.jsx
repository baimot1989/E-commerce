
import { Box, Typography, Paper } from "@mui/material";

const CarouselSlide = ({ content }) => {
    
    return (
        <Paper elevation={3} sx={{ overflow: "hidden", borderRadius: 3, height: {xs: 280, md: 215, xl: 300} }}>
          <Box
            component="img"
            src={content.imgSrc}
            alt={content.title}
            sx={{
              width: "100%",
              height: { xs: 200, md: 180, xl: 250  },
              objectFit: 'contain'
            }}
          />
          <Box sx={{ p: 1, backgroundColor: "background.paper" }}>
            <Typography variant="body1" align="center">
              {content.title}
            </Typography>
          </Box>
        </Paper>
      );
}
 
export default CarouselSlide ;


