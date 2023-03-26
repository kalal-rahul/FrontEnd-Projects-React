import  Axios  from "axios";
import { useState } from "react";
import { BookCard } from "../Components/BookCard";
import { Navbar } from "../Components/Navbar";

export const BookSearch = (props) => {

    const [availableBooks, setAvailableBooks] = useState([]);

    let searchedBook = "";

    const handleClick = async () => {

        await Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchedBook}&filter=ebooks&key=AIzaSyDnjxV0J2xUBLBAejecvQwUrxKZSDWWbfE`)
        .then((response) => {
            // console.log(response.data);
            setAvailableBooks(response.data.items)

        }).catch((error) => {
            console.log(error);
            alert("Sorry...\nUnable to fetch data from SERVER");
        });


    };


    return (
        <div>
            <Navbar/>

            <h1 className='center-text'>Search for Books...</h1>
            <div className="search-container flex">
                <input type="text" placeholder='Enter the book title...'  onChange={(e) => searchedBook = e.target.value}/>
                <button onClick={handleClick}>Search Book</button>
            </div>
            <div className='book-outer-container flex'>
            {
                    availableBooks.map((resultItem, index) => {
                       

                        let eachBookData = {
                            bookName: resultItem.volumeInfo.title,
                            cost: resultItem.saleInfo.listPrice?.amount,
                            bookImage : resultItem.volumeInfo.imageLinks.smallThumbnail
                        };

                        return (
                            <div key={index}>
                                <BookCard
                                    eachBookData={eachBookData}
                                    index={index}
                                />
                            </div>
                        );
                    })
                }
            </div>

        </div>
    );
};