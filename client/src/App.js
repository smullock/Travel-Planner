import './App.css'
import {Button} from 'antd';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';


function App() {
  return (
    <div className="App">
 
        <BrowserRouter>
        
            <Routes>

              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>

            
            </Routes>
        </BrowserRouter>
        
     
    </div>
  );
}

export default App;
