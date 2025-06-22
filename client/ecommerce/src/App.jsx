
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import Signup from './pages/signup';
import HomePage from './pages/homePage'
import CustomerDashboard from './pages/customerDashboard';
import Categories from './adminMode/adminPages/Categories';
import Customers from './adminMode/adminPages/customers';
import Products from './adminMode/adminPages/products';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Statistics from './adminMode/adminPages/statistics';
import AppBarRes from './components/appBar';
import { green, teal, yellow } from '@mui/material/colors';
import Home from './adminMode/adminPages/home'
import Footer from './components/footer';
import MyOrders from './customerMode/customersPages/myOrders';
import MyAccount from './customerMode/customersPages/myAccount';
import ProductsCatlog from './customerMode/customersPages/productsCatlog';
import ProductPage from './components/productPage';
import GuestRoute from './components/ProtectionRoute/guestRoute';
import CustomerRoute from './components/ProtectionRoute/customerRoute';
import AdminRoute from './components/ProtectionRoute/adminRoute';
import ShoppingCart from './customerMode/components/shopingCart';
import ModalMassgae from './components/modal';


// const theme = createTheme({
//   palette: {
//     primary: teal
//   }
// });

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],       // Light green
      light: green[100],      // Even lighter
      dark: green[800],       // Optional darker shade
      contrastText: 'white' // Dark teal for contrast
    }
  }
});

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <h1>Next Generation E-Commerce</h1> */}
        <AppBarRes />
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route element={<GuestRoute />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
          
          <Route element={<AdminRoute />} >
            <Route path='admindash' element={<Home />} />
            <Route path='admindash/categories' element={<Categories />} />
            <Route path='admindash/customers' element={<Customers />} />
            <Route path='admindash/products' element={<Products />} />
            <Route path='admindash/statistics' element={<Statistics />} />
          </Route>

          <Route element={<CustomerRoute />} >
            <Route path='customerdash' element={<ProductsCatlog />} />
            <Route path='customerdash/products' element={<ProductsCatlog />} />
            <Route path='customerdash/myorders' element={<MyOrders />} />
            <Route path='customerdash/myaccount' element={<MyAccount />} />
            <Route path='customerdash/product/:id' element={<ProductPage />} />
          </Route>
        </Routes>
        <ModalMassgae />
        <ShoppingCart />
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App
