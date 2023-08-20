import LandingPage from './pages/Client/Landing Page/landingPage';
import AllProducts from './pages/Products/AllProducts';
import AboutUs from './pages/About Us/AboutUs';
import Contact from './pages/Contact/Contact';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard/view/Dashboard';
import CreateProduct from './pages/Admin/Dashboard/view/CreateProduct';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/Products' element={<AllProducts />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/create-product' element={<CreateProduct />} />
      </Routes>
    </>
  );
}

export default App;
