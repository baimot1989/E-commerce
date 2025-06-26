import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';

// Layout
import AppBarRes from './components/appBar';
import Footer from './components/footer';
import ModalMassgae from './components/modal';
import ShoppingCart from './customerMode/components/shopingCart';

// Public Pages
import HomePage from './pages/homePage';
import Login from './pages/login';
import Signup from './pages/signup';
import NotFound from './pages/notFound';

// Admin Pages
import Home from './adminMode/adminPages/home';
import Categories from './adminMode/adminPages/Categories';
import Customers from './adminMode/adminPages/customers';
import Products from './adminMode/adminPages/products';
import Statistics from './adminMode/adminPages/statistics';

// Customer Pages
import ProductsCatlog from './customerMode/customersPages/productsCatlog';
import MyOrders from './customerMode/customersPages/myOrders';
import MyAccount from './customerMode/customersPages/myAccount';
import ProductPage from './components/productPage';

// Protected Routes
import GuestRoute from './components/ProtectionRoute/guestRoute';
import CustomerRoute from './components/ProtectionRoute/customerRoute';
import AdminRoute from './components/ProtectionRoute/adminRoute';

// Theme Setup
const theme = createTheme({
  palette: {
    primary: {
      main: indigo[700],
      light: indigo[100],
      dark: indigo[900],
      contrastText: 'white'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBarRes />

        <Box sx={{ flex: 1, paddingBottom: '70px' }}>
          <Routes>
            <Route path='/' element={<HomePage />} />

            {/* Guest-only routes */}
            <Route element={<GuestRoute />}>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Route>

            {/* Admin routes */}
            <Route element={<AdminRoute />}>
              <Route path='admindash' element={<Home />} />
              <Route path='admindash/categories' element={<Categories />} />
              <Route path='admindash/customers' element={<Customers />} />
              <Route path='admindash/products' element={<Products />} />
              <Route path='admindash/statistics' element={<Statistics />} />
            </Route>

            {/* Customer routes */}
            <Route element={<CustomerRoute />}>
              <Route path='customerdash' element={<ProductsCatlog />} />
              <Route path='customerdash/products' element={<ProductsCatlog />} />
              <Route path='customerdash/myorders' element={<MyOrders />} />
              <Route path='customerdash/myaccount' element={<MyAccount />} />
              <Route path='customerdash/product/:id' element={<ProductPage />} />
            </Route>

            {/* 404 */}
            <Route path='/*' element={<NotFound />} />
          </Routes>

          {/* Global Modals and Components */}
          <ModalMassgae />
          <ShoppingCart />
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
