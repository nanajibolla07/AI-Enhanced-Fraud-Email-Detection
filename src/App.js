import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Login from './components/Login';
import SignUp from './components/Signup';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      {/* <AuthContext> */}
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<TextForm/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
          </Routes>
        </BrowserRouter>
      {/* </AuthContext> */}
    </div>
  );
}

export default App;
