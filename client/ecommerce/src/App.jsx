
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import Signup from './pages/signup';
import HomePage from './pages/homePage'
import AdminDashboard from './pages/AdminDashboard';
import { Navigate } from 'react-router-dom';
import CustomerDashboard from './pages/customerDashboard';
import Categories from './adminMode/adminPages/Categories';
import Customers from './adminMode/adminPages/customers';
import Products from './adminMode/adminPages/products';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Statistics from './adminMode/adminPages/statistics';
import AppBarRes from './components/appBar';
import { teal } from '@mui/material/colors';
import Home from './adminMode/adminPages/home'
import Footer from './components/footer';
import { useSelector } from 'react-redux';
import MyOrders from './customerMode/customersPages/myOrders';
import MyAccount from './customerMode/customersPages/myAccount';
import ProductsCatlog from './customerMode/customersPages/productsCatlog';


const theme = createTheme({
  palette: {
    primary: teal
  }
}); 

function App() {
  
  const user = useSelector((state) => state.auth.user);
 
  return (
    <>
    <ThemeProvider theme={theme}>
      {/* <h1>Next Generation E-Commerce</h1> */}
      <AppBarRes />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={  <Login />} />
        <Route path='/signup' element={!user && <Signup />} />

        <Route path='/admindash' element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />} >
          <Route path='home' element={<Home />} />
          <Route path='categories' element={<Categories />} />
          <Route path='customers' element={<Customers />} />
          <Route path='products' element={<Products/>} />
          <Route path='statistics' element={<Statistics/>} />
        </Route>
        
        <Route path='/customerdash' element={user?.role === 'customer' ? <CustomerDashboard /> : <Navigate to="/" replace />} >
          {/* <Route path='home' element={<Home />} /> */}
          <Route path='products' element={<ProductsCatlog />} />
          <Route path='myorders' element={<MyOrders />} />
          <Route path='myaccount' element={<MyAccount/>} />
        </Route>
      </Routes>
      <Footer />
      </ThemeProvider>
    </>
  )
}

export default App
