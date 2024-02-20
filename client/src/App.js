import { Link, Route, Routes } from 'react-router-dom'
import Login from './components/Login.js';
import Register from './components/Register.js';
import NotFound from './components/NotFound.js';
import Main from './components/Main.js';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
