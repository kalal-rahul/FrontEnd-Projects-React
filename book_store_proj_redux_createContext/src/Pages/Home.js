import { useContext, useEffect, useState } from 'react';
import { Navbar } from '../Components/Navbar';
import bookImage from '../assests/book-image.png';
import Axios from 'axios';
import { DataContext } from '../App';
import { BookCard } from '../Components/BookCard';


export const Home = (props) => {

    const {cart} = useContext(DataContext);
    const {setCart} = useContext(DataContext);

    // const availableBooks = [
    //     {
    //     bookName : "Dune",
    //     cost: 600
    // },
    // {
    //     bookName : "Love & War",
    //     cost: 800
    // },
    // {
    //     bookName : "Peace",
    //     cost: 1000
    // },
    // {
    //     bookName : "Autopsy",
    //     cost: 1400
    // },
    // {
    //     bookName : "Fire",
    //     cost: 1440
    // }
    // ]

    const [availableBooks, setAvailableBooks] = useState([ {
            bookName : "Dune",
            cost: 600
        },
        {
            bookName : "Love & War",
            cost: 800
        },
        {
            bookName : "Peace",
            cost: 1000
        },
        {
            bookName : "Autopsy",
            cost: 1400
        },
        {
            bookName : "Fire",
            cost: 1440
        }]);

    // useEffect(() => {

    //     Axios.get("http://localhost:8080/book/getBooks")
    //         .then((response) => {

    //             setAvailableBooks(response.data);
    //             // console.log(response);

    //         })
    //         .catch((error) => {

    //             alert("Sorry...\nUnable to fetch Book data");

    //             console.log(error);
    //         });

    // }, []); //Re-render the page whenevr there is change in state of variable in the array

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
            <Navbar/>

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
                                    bookImage = {bookImage} 
                                /> 


                                {/* No need to drill the prop */}
                                {/* <BookCard
                                    eachBookData={eachBookData}
                                    index={index}
                                    setCart={setCart}
                                    cart={cart}
                                /> */}
                            </div>
                        );
                    })
                }

            </div>
        </div>
    );
};


