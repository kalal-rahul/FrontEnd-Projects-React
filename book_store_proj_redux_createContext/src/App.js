import './App.css';
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import { Home } from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';
import { LoggedOut } from './Pages/LoggedOut';
import { PrivateRoute } from './Pages/PrivateRoute';
import { MyOrders } from './Pages/MyOrders';
import { Cart } from './Pages/Cart';
import { BookSearch } from './Pages/BookSearch';

export const DataContext = createContext();

function App() {

  if (sessionStorage.getItem("userLoggedIn") === null) {
    sessionStorage.setItem("userLoggedIn", "false");
  }

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
                <DataContext.Provider value={{ userName, setUserName, cart, setCart }}>
                  <Cart />
                </DataContext.Provider>


                {/* <Cart
                  setUserName={setUserName}
                  cart={cart}
                  setCart={setCart}
                  userName={userName} /> */}
              </PrivateRoute>
            }
          />


         {/* <Route path="/home" element=
            {
              <PrivateRoute userName={userName}  >
                <DataContext.Provider value={{ userName, setUserName, cart, setCart }}>
                  <Home />
                </DataContext.Provider>

                This way of prop drilling is not required
                <Home
                  userName={userName}
                  setUserName={setUserName}
                  setCart={setCart}
                  cart={cart} />

              </PrivateRoute>
            }
          />  */}

          <Route path="/relogin" element={<LoggedOut />} />

          <Route path="/myorders" element=
            {
              <PrivateRoute userName={userName}  >
                <DataContext.Provider value={{ userName, setUserName, cart, setCart }}>
                  <MyOrders />
                </DataContext.Provider>


                {/* <MyOrders
                  userName={userName}
                  setUserName={setUserName} /> */}
              </PrivateRoute>
            }
          />
          <Route path="/searchBook" element=
            {
              <PrivateRoute userName={userName}  >
                <DataContext.Provider value={{ userName, setUserName, cart, setCart }}>
                  <BookSearch/>
                </DataContext.Provider>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
