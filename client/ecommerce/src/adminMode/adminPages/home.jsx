import { Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { border, Container, margin } from "@mui/system";
import { Link } from "react-router-dom";

const pages = [
    {
        name: 'Categories',
        imageSrc: 'https://cdn.pixabay.com/photo/2021/10/11/23/49/app-6702045_1280.png'
    },
    {
        name: 'Products',
        imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTngJZrFdrp3ZMXVRw4u6kieRjryMzqnmpJpK6pJzPY-HZXHZw5QQ3T9LYJ60U6BeKL0Zw&usqp=CAU'
    },
    {
        name: 'Customers',
        imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8P90NGnC8Py2hts6SKhc_hDcidrPt6u8Yzw&s'
    },
    {
        name: 'Statistics',
        imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ88nkVkkNvkOV_gtI5jMzDnsGlsyp86UMWkg&s'
    },
];

const useStyles = makeStyles({
    gridItem:{
        textAlign: 'center',
        backgroundColor: '#fafafa',
        paddingBottom: '20px',

        '&:hover' : {
            backgroundColor: '#607d8b',
            
        }
    }
})


const Home = () => {
    const classes = useStyles();
    return (
        <>
            <Container style={{margin: '20px 0'}}>
                <Grid container spacing={2}>
                    {pages.map(page => (
                        <Grid key={page.name} size={{ xs: 12, sm: 6, md: 3 }}>
                            <Link to={`/admindash/${page.name}`} style={{ textDecoration: 'none', color: 'black' }}>
                                <Paper className={classes.gridItem}>
                                    <Typography style={{marginBottom: '10px', paddingTop: '10px'}} variant="h4">{page.name}</Typography>
                                    <div>
                                        <img src={page.imageSrc} width={'80%'} alt={page.name} />
                                    </div>
                                </Paper>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default Home;