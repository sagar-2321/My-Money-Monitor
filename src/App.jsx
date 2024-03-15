// import { Button } from 'antd';
import './App.css';
// import 'antd/dist/antd.css';
import 'antd/dist/antd.min.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Test from './pages/Test';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Routes>
                  <Route path='/' element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
                  {/* <Route path='/' element={<Home/>}/> */}
                  <Route path='/login' element={<SingletonAccess><Login/></SingletonAccess>}/>
                  <Route path='/register' element={<SingletonAccess><Register/></SingletonAccess>}/>
                  <Route path='/test' element={<Test/>}/>
            </Routes>
      </BrowserRouter>
    </div>
  );
}
export function ProtectedRoutes(props){
  if(localStorage.getItem('moneyMonitor-user')){
    return props.children;
  }else{
    return <Navigate to={'/login'}/>
  }
}
export function SingletonAccess(props){
  if(localStorage.getItem('moneyMonitor-user')){
    return <Navigate to={'/'}/>
  }else{
    return props.children;
  }
}


export default App;
