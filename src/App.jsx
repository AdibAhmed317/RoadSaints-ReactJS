import LandingPage from './pages/Client/Landing Page/landingPage';
import AllProducts from './pages/Products/AllProducts';
import AboutUs from './pages/About Us/AboutUs';
import Contact from './pages/Contact/Contact';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Cart from './pages/Client/Dashboard/CWO/Cart';
import CustomerDashboard from './pages/Client/Dashboard/Dashboard';
import { Route, Routes } from 'react-router-dom';

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
      </Routes>
    </>
  );
}

export default App;
