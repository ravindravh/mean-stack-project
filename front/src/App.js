import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav.js'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Footer from './components/Footer.js';
import SignUp from './components/SignUp.js';
import PrivateComponent from './components/PrivateComponent.js';
import Login from './components/Login.js';
import AddProducts from './components/AddProducts.js';
import ProductList from './components/ProductList.js';
import UpdateProduct from './components/UpdateProduct.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element ={<PrivateComponent/>}>
          <Route path='/' element={<ProductList/>} />
          <Route path='/add' element={<AddProducts/>} />
          <Route path='/update/:id' element={<UpdateProduct/>} />
          <Route path='/logout' element={<h1> Logout</h1>} />
          <Route path='/profile' element={<h1> Profile</h1>} />
        </Route>
        <Route path='/SignUp' element={<SignUp/>} />
        <Route path='/Login' element={<Login/>}/>
      </ Routes>
      <Footer/>

      </BrowserRouter>

      
    </div>
  );
}

export default App;
