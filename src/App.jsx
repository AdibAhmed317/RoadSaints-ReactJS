import LandingPage from './pages/Client/Landing Page/landingPage';
import AllProducts from './pages/Products/AllProducts';
import AboutUs from './pages/Client/About Us/AboutUs';
import Contact from './pages/Client/Contact/Contact';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Cart from './pages/Client/Dashboard/CWO/Cart';
import CustomerDashboard from './pages/Client/Dashboard/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import CreateProduct from './pages/Admin/Dashboard/CreateProduct';
import EditProduct from './pages/Admin/Dashboard/EditProduct';
import ShowOrders from './pages/Admin/Dashboard/ShowOders';
import ShowCustomers from './pages/Admin/Dashboard/ShowCustomers';
import CustomerDetails from './pages/Admin/Dashboard/CustomerDetails';
import OrderDetails from './pages/Admin/Dashboard/OrderDetails';
import AdminProfile from './components/Admin/AdminProfile';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/Products' element={<AllProducts />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/client' element={<CustomerDashboard />} />
        <Route path='/client/CWO/cart' element={<Cart />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/create-product' element={<CreateProduct />} />
        <Route path='/admin/orders' element={<ShowOrders />} />
        <Route path='/admin/profile' element={<AdminProfile />} />
        <Route
          path='/admin/order-details/:orderId'
          element={<OrderDetails />}
        />
        <Route path='/admin/customers' element={<ShowCustomers />} />
        <Route
          path='/admin/customer-details/:customerId'
          element={<CustomerDetails />}
        />
        <Route
          path='/admin/edit-product/:productId'
          component={<EditProduct />}
        />
      </Routes>
    </>
  );
}

export default App;
