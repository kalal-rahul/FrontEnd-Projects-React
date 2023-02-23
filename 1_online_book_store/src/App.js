import './App.css';
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import { Home } from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { LoggedOut } from './Pages/LoggedOut';
import { PrivateRoute } from './Pages/PrivateRoute';
import { MyOrders } from './Pages/MyOrders';
import { Cart } from './Pages/Cart';


function App() {

  const [userName, setUserName] = useState(null);
  const [cart, setCart] = useState([]);

  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />

          <Route path="/login" element={<Login setUserName={setUserName} />} />


          <Route path="/cart" element=
            {
              <PrivateRoute userName={userName} >
                <Cart
                  setUserName={setUserName}
                  cart={cart}
                  setCart={setCart}
                  userName={userName} />
              </PrivateRoute>
            }
          />


          <Route path="/home" element=
            {
              <PrivateRoute userName={userName} >
                <Home
                  userName={userName}
                  setUserName={setUserName}
                  setCart={setCart}
                  cart={cart} />
              </PrivateRoute>
            }
          />

          <Route path="/relogin" element={<LoggedOut />} />

          <Route path="/myorders" element=
            {
              <PrivateRoute userName={userName} >
                <MyOrders
                  userName={userName}
                  setUserName={setUserName} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
