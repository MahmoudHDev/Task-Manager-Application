import { Link, Route, Routes } from 'react-router-dom'
import Login from './components/Login.js';
import Register from './components/Register.js';
import NotFound from './components/NotFound.js';


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>


      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold text-body-emphasis">Centered hero</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">to do tasks Application to update and persist data on the web.</p>
          <p className="lead mb-4">Culpa elit aute velit fugiat elit sunt laboris voluptate consequat sit. Eiusmod aliquip veniam dolor est ullamco et laboris. Commodo eu ea sunt qui adipisicing laborum dolor fugiat. Incididunt aliquip nulla culpa mollit aliquip officia pariatur et pariatur veniam culpa reprehenderit. Elit sint duis veniam veniam dolore minim dolor do occaecat ex dolor cillum reprehenderit.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">

            <button type="button" className="btn btn-primary btn-lg px-4 gap-3"><Link to={"/login"}></Link> Login</button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4"><Link to={"/register"}></Link>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
