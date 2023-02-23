import { Navbar } from "../Components/Navbar";
import bookImage from '../assests/book-image.png';
import { useState } from "react";
import Axios from "axios";

export const Cart = (props) => {

    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState(null);


    const handlePlaceOrder = async () => {

        let selectedBooks = props.cart.map((eachBookData) => {
            return ({ bookName: eachBookData.bookName });
        });

        console.log(selectedBooks);

        await Axios.post(`http://localhost:8080/purchase/buyBooks?email=${props.userName}`, selectedBooks).then((response) => {

            console.log(response);
            setOrderId(response.data.purchaseId);
            setOrderPlaced(true);

        }).catch((error) => {

            alert("Couldn't connect to SERVER \nNo Order placed.");
            console.log(error);

        });


        props.setCart([]);
    };

    const handleDummyPlaceOrder = () =>{
        setOrderId(40);
        setOrderPlaced(true);
        props.setCart([]);
    }

    return (
        <div>
            <Navbar
                userName={props.userName}
                setUserName={props.setUserName}
            />
            <h1 className='center-text' >MY - CART </h1>
            <div className="book-outer-container flex">
                {
                    props.cart.map((eachBookData, index) => {
                        return (
                            <div key={index}>
                                <CartBookCard
                                    cart={props.cart}
                                    eachBookData={eachBookData} 
                                    setCart={props.setCart}
                                    delPos={index}
                                />
                            </div>
                        );
                    })
                }
            </div>

            {orderPlaced && <PostOrder orderId={orderId} />}

            {

                (props.cart.length > 0) ?

                    (<div className="order-btn">
                        <button onClick={handlePlaceOrder}>PLACE ORDER</button>
                        <button onClick={handleDummyPlaceOrder}>PLACE DUMMY ORDER</button>
                    </div>) :

                    (<div className="center-text">
                        <h1>No Books in cart...</h1>
                    </div>)
            }
        </div>
    );
};

const CartBookCard = (props) => {


    const handleRemoveFromCart =  (removeBook) => {

        // console.log(props.cart);

        let updatedCart = props.cart.filter((eachBookData, index) => {

            // console.log("INDEX " + index + " DEL POS " + props.delPos)

            //If bookName is same as removeBook && Pos is same as delPOS ---> Do not return that elem i.e filter it
            if ((eachBookData.bookName === removeBook) && (index === props.delPos))
                    return false;
            else
                    return true;
        } );
        // console.log(updatedCart)
        props.setCart(updatedCart);
        
    };

    return (
        <div className='book-card flex-column' key={props.index}>
            <div className='book-image'>
                <img src={bookImage} alt="Image of book" />
            </div>
            <div className='book-detail'>
                <h3>{props.eachBookData.bookName}</h3>
                <p>Rs.{props.eachBookData.cost} /-</p>
                <button onClick={() => handleRemoveFromCart(props.eachBookData.bookName)}>Remove from Cart</button>
            </div>
        </div>
    );
};

const PostOrder = (props) => {
    return (
        <div className="center-text">
            <h1>Thank you for placing order</h1>
            <h1>Your ORDER ID : {props.orderId}</h1>
        </div>
    );
};