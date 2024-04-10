import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Login from './components/Login';
import SignUp from './components/Signup';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <div className="App">
      {/* <AuthContext> */}
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/runanalysis' element={<TextForm/>}></Route>
          </Routes>
        </BrowserRouter>
      {/* </AuthContext> */}
    </div>
  );
}

export default App;
