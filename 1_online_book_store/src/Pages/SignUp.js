import "../App.css";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import Axios from "axios";



export const SignUp = () => {

    //Step 1: Form  Data Obj shape is to be defined
    const schema = yup.object().shape(
        {
            userName: yup.string().required("Please enter your name"),
            email: yup.string().email(),
            phone: yup.string(),
            password: yup.string().min(4),
            confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password should match")
        }
    );


    // Step 2: Link the Form Data Obj using 'resolver' for validation 
    // This step integrates the two libraries | reactHookForm & Yup |
    const { register: formData, handleSubmit, formState: { errors }, reset, resetField } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );

    const onSubmit = (data) => {
        // console.log(data);

        let formResponseBody = {
            userName: data.userName,
            phone: data.phone,
            password: data.password,
            email: data.email
        };

        /* Sign Up - BACKEND - INTERACTION

        Axios.post("http://localhost:8080/user/signup", formResponseBody)
                    .then((response) => {

                        // console.log(response.data);

                        if (response.data.message.toLowerCase().includes("duplicate")) {
                            alert("Email id already used");
                            resetField("email");
                        }
                        else {
                            alert(response.data.message + "\nPlease Login to continue");
                            reset(); //Reset the entire form
                        }

                    }

                ).catch((error) => {
                    alert("Sorry...Something went wrong  :( \nCouldn't Sign Up, please try again");
                }
            );
        */

        
        /* When No errors in FORM and No - Back End Interaction */
        alert("Sign Up Successful !\nPlease Login to buy books.");
        reset();
    }; 


    //This is to handle the form Errors 
    const onError = () => {
        console.log("ERROR IN FORM", errors);
    };



    return (

        <div className="form-container" >
            <form action="" className="flex-column form-item" onSubmit={handleSubmit(onSubmit, onError)}>

                <header>
                    <h2>Sign Up</h2>
                </header>

                <div className="form-field flex-column">
                    <label htmlFor="user-name">Name</label>
                    <input type="text" placeholder="Enter your name" name="user-name" {...formData("userName")} />
                    {errors.userName && <p className="error-msg">{errors.userName?.message}</p>}
                </div>


                <div className="form-field flex-column">
                    <label htmlFor="user-id">Email</label>
                    <input type="email" placeholder="Enter your email" name="user-id"  {...formData("email")} />
                    {errors.email && <p className="error-msg">{errors.email?.message}</p>}
                </div>


                <div className="form-field flex-column">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" placeholder="Enter your phone" name="phone" {...formData("phone")} />
                </div>


                <div className="form-field flex-column">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" name="password"  {...formData("password")} />
                    {errors.password && <p className="error-msg">{errors.password?.message}</p>}
                </div>


                <div className="form-field flex-column">
                    <label htmlFor="confirm-password">Confirm password</label>
                    <input type="password" placeholder="Password" name="confirm-password" {...formData("confirmPassword")} />
                    {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword?.message}</p>}
                </div>

                <input type="submit" name="sign-up" value="Sign Up" />

                <footer>
                    <p>Already have an account? <Link to="/login" >Login</Link> </p>
                </footer>

            </form>
        </div>

    );
};