import { Link } from 'react-router-dom';


export const LoggedOut = () =>{
    return(
        <div className='center-text'>
            <h1>You are logged out...</h1>
            <h1>Please <Link to="/login" >Login</Link></h1>
        </div>        
    )
}