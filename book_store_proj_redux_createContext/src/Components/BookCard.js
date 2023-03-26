import { useContext, useState } from "react";
import { DataContext } from "../App";
import bookImage from '../assests/book-image.png';

export const BookCard = (props) => {

    const [addToCart, setAddToCart] = useState("Add to Card");
    const {cart} = useContext(DataContext);
    const {setCart} = useContext(DataContext);


    const handleAddToCart = (eachBookData) => {

        setAddToCart((prev) => {

            if (prev === "Add to Card") {

                setCart([...cart, eachBookData]);
                return ("Remove from Cart");
            }

            else {

                let removed = false;
                let bookToBeRemoved = eachBookData.bookName;
                let updatedCart = cart.filter((removeBook) =>{
                    if ((removeBook.bookName === bookToBeRemoved) && !removed){
                        removed = true;
                        return false;
                    }
                    else
                        return true;

                })

                setCart(updatedCart);
                return ("Add to Card");
            }
        }
        );

    };

    return (
        <div className='book-card flex-column' key={props.index}>
            <div className='book-image'>
                <img src={props.eachBookData.bookImage} alt="Image of book" />
            </div>
            <div className='book-detail'>
                <h3>{props.eachBookData.bookName}</h3>
                <p>Rs.{props.eachBookData.cost} /-</p>
                <button onClick={() => { handleAddToCart(props.eachBookData) }}>{addToCart}</button>
            </div>
        </div>
    );
};