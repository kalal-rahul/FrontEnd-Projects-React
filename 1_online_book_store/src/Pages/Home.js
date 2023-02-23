import { useEffect, useState } from 'react';
import { Navbar } from '../Components/Navbar';
import bookImage from '../assests/book-image.png';
import Axios from 'axios';
import { availableBooksRawData } from '../assests/BookRawData';


export const Home = (props) => {

    const [availableBooks, setAvailableBooks] = useState(availableBooksRawData);

    /* Fetch Data from backEnd & Update Book Shelf

    useEffect(() => {

        Axios.get("http://localhost:8080/book/getBooks")
            .then((response) => {

                setAvailableBooks(response.data);
                // console.log(response);

            })
            .catch((error) => {

                alert("Sorry...\nUnable to fetch Book data");

                console.log(error);
            });

    }, []); //Re-render the page whenevr there is change in state of variable in the array
    */

    const handleUpdateBook = () => {

        Axios.get("http://localhost:8080/book/getBooks")
            .then((response) => {

                setAvailableBooks(response.data);
            })
            .catch((error) => {

                alert("Sorry...\nUnable to fetch Book data");

                console.log(error);
            });
    };



    return (
        <div>
            <Navbar
                setUserName={props.setUserName}
                userName={props.userName}
            />

            <h1 className='center-text'>Home Page - List of all available books</h1>
            <button onClick={handleUpdateBook}>UPDATE BOOK SHELF</button>
            <div className='book-outer-container flex'>
                <div className='book-card flex-column'>
                    <div className='book-image'>
                        <img src={bookImage} alt="Image of book" />
                    </div>
                    <div className='book-detail'>
                        <h3>Dummy Book</h3>
                        <p>Rs.600</p>
                        {/* <button onClick={handleAddToCart}>Add to cart</button> */}
                    </div>
                </div>

                {
                    availableBooks.map((eachBookData, index) => {
                        return (
                            <div key={index}>
                                <BookCard
                                    eachBookData={eachBookData}
                                    index={index}
                                    setCart={props.setCart}
                                    cart={props.cart}
                                />
                            </div>
                        );
                    })
                }

            </div>
        </div>
    );
};


const BookCard = (props) => {

    const [addToCart, setAddToCart] = useState("Add to Card");


    const handleAddToCart = (eachBookData) => {

        setAddToCart((prev) => {

            if (prev === "Add to Card") {

                props.setCart([...props.cart, eachBookData]);
                return ("Remove from Cart");
            }

            else {

                let removed = false;
                let bookToBeRemoved = eachBookData.bookName;
                let updatedCart = props.cart.filter((removeBook) =>{
                    if ((removeBook.bookName === bookToBeRemoved) && !removed){
                        removed = true;
                        return false;
                    }
                    else
                        return true;

                })

                props.setCart(updatedCart);
                return ("Add to Card");
            }
        }
        );

    };

    return (
        <div className='book-card flex-column' key={props.index}>
            <div className='book-image'>
                <img src={bookImage} alt="Image of book" />
            </div>
            <div className='book-detail'>
                <h3>{props.eachBookData.bookName}</h3>
                <p>Rs.{props.eachBookData.cost} /-</p>
                <button onClick={() => { handleAddToCart(props.eachBookData) }}>{addToCart}</button>
            </div>
        </div>
    );
};