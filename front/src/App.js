import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav.js'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Footer from './components/Footer.js';
import SignUp from './components/SignUp.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/' element={<h1> Product Listing</h1>} />
        <Route path='/add' element={<h1> Product Addition</h1>} />
        <Route path='/update' element={<h1> Product Update</h1>} />
        <Route path='/logout' element={<h1> Logout</h1>} />
        <Route path='/profile' element={<h1> Profile</h1>} />
        <Route path='/SignUp' element={<SignUp/>} />
      </Routes>
      <Footer/>

      </BrowserRouter>

      
    </div>
  );
}

export default App;
