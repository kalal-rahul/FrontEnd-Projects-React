import '../App.css';
import { Link, useNavigate } from 'react-router-dom';



export const Navbar = (props) => {

    const navigateToPage = useNavigate();

    const handleClick = () => {
        // alert("Move to my Orders");
    };

    const handleLogOut = () => {
        props.setUserName(null);
        navigateToPage("/relogin");
    };

    return (
        <div >
            <div className="head-container flex">
                <h3>User: {props.userName}</h3>

                <div className="nav-container flex">
                    <Link to={"/myorders"} onClick={handleClick}> My Orders</Link>
                    <Link to={"/home"}> Home Page</Link>
                    <Link to={"/cart"}> My Cart</Link>
                    <button onClick={ () => handleLogOut(navigateToPage) }>LOG OUT</button>
                </div>

            </div>

        </div>
    );
}



