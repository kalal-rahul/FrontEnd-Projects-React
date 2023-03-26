import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../App';



export const Navbar = (props) => {

    const navigateToPage = useNavigate();
    const {userName} = useContext(DataContext);
    const {setUserName} = useContext(DataContext);

    const handleClick = () => {
        // alert("Move to my Orders");
    };

    const handleLogOut = () => {
        // props.setUserName(null); This is a prop drilled
        
        setUserName(null);
        sessionStorage.setItem("userLoggedIn", "false");
        sessionStorage.removeItem("userName");
        navigateToPage("/relogin");
    };

    return (
        <div >
            <div className="head-container flex">
                <h3>User: {sessionStorage.getItem("userName")}</h3>

                <div className="nav-container flex">
                    <Link to={"/myorders"} onClick={handleClick}> My Orders</Link>
                    {/* <Link to={"/home"}> Home Page</Link> */}
                    <Link to={"/cart"}> My Cart</Link>
                    <Link to={"/searchBook"}>Search Book</Link>
                    <button onClick={ () => handleLogOut(navigateToPage) }>LOG OUT</button>
                </div>

            </div>

        </div>
    );
}



