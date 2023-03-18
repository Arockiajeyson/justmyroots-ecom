import './App.css';
import LoginPageE from './LoginPageE';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import {TostContext} from './TostContext'
import Signup from './Signup';
import Product from './Product';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <TostContext>
        <Routes>
          <Route path='/' element={<LoginPageE/>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/product' element={<Product/>}/>
        </Routes>
      </TostContext>
     </BrowserRouter>
    </div>
  );
}

export default App;
