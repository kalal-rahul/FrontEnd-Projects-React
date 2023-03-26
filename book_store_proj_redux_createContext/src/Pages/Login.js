import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import Axios from "axios";



export const Login = (props) => {

    const { register: loginData, handleSubmit, reset, resetField } = useForm();
    const navigateToPage = useNavigate();


    const onSubmit = async (data) => {
        // console.log(data);

        let formResponseBody = {
            email: data.email,
            password: data.password
        };



        // await Axios.post("http://localhost:8080/user/login", formResponseBody)

        //     .then((response) => {

        //         // console.log(response.data);

        //         if (response.data.message.toLowerCase().includes("invalid email")) {
        //             alert(response.data.message);
        //             resetField("email");
        //         }

        //         else if (response.data.message.toLowerCase().includes("invalid password")) {
        //             alert(response.data.message);
        //             resetField("password");
        //         }

        //         else {
        //             alert(response.data.message);
        //             reset(); //Reset the entire form
        //             navigateToPage("/home");
        //         }

        //     }

        //     ).catch((error) => {
        //         alert("Sorry...Something went wrong  :( \nCouldn't Login (SERVER ERROR)");
        //         console.log(error);
        //     }
        //     );

        props.setUserName(data.email);
        sessionStorage.setItem("userLoggedIn", "true");
        sessionStorage.setItem("userName", data.email);
        navigateToPage("/searchBook") //This needs to be removed 
    };


    return (
        <div className="form-container">
            <form action="" className="flex-column form-item" onSubmit={handleSubmit(onSubmit)}
            >
                <header>
                    <h2>Login</h2>
                </header>

                <div className="form-field flex-column">
                    <label htmlFor="user-id">Username</label>
                    <input type="email" placeholder="Enter your email" name="user-id" {...loginData("email")} required />
                </div>

                <div className="form-field  flex-column">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password..." name="password" {...loginData("password")} required />
                </div>

                <input type="submit" name="login" value="Login" />

                <footer>
                    <p>Do not have an account? <Link to="/" >Sign Up</Link> </p>
                </footer>

            </form>
        </div>
    );
};