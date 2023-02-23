import { Navigate, useNavigate } from "react-router-dom";


export const PrivateRoute = ({children, userName}) => {

    // This cannot be used here as we want to return a component, 
    // after a particular condition is met.
    // Hence using <Navigate/> component
    const navigateToPage = useNavigate();




    let cond = userName;
    // let cond = true;

    return (
            cond ? children : <Navigate to={"/relogin"}/>
    );
}