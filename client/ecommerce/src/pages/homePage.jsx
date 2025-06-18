import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" gutterBottom>ברוך הבא לחנות שלנו</Typography>
        <Typography variant="subtitle1">מוצרים איכותיים, שירות מהיר, מחירים נוחים</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} component={Link} to="/customerdash/products">
          התחל לקנות
        </Button>
      </Box>

      <Grid container spacing={2}>
        {["אלקטרוניקה", "ביגוד", "מבצעים"].map((cat) => (
          <Grid item xs={12} sm={4} key={cat}>
            <Card>
              <CardContent>
                <Typography variant="h6">{cat}</Typography>
                <Button component={Link} to="/customerdash/products" size="small">
                  ראה מוצרים
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
