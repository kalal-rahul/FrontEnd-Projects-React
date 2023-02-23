import Axios from 'axios';
import { useState } from 'react';
import { fakePurchasedBooks } from '../assests/BookRawData';
import { Navbar } from '../Components/Navbar';
import { OrderDetail } from '../Components/OrderDetail';


export const MyOrders = (props) => {


    const [bookData, setBookData] = useState([]);
    const [name, setName] = useState(null);
    const [purchaseID, setPurchaseID] = useState("");
    const [totalCost, setTotalCost] = useState("");
    const [message, setMessage] = useState("");
    const [dataAvailable, setDataAvailable] = useState(false);


    let ORDER_ID = null;
    let tempId = null;



    const handleClick = async () => {

        ORDER_ID = tempId;

        console.log(ORDER_ID);

        await Axios.get(`http://localhost:8080/purchase/purchaseDetail/${ORDER_ID}`)
            .then((response) => {
                console.log(response);
                setName(response.data.customerName);
                setPurchaseID(response.data.purchaseId);
                setTotalCost(response.data.totalCost);
                setBookData(response.data.purchasedBooks);
                setMessage(response.data.message);
                setDataAvailable(true);

            }).catch((error) => {
                console.log(error);
                alert("Something went wrong from our side (SERVER)");
            });
    };

    const handleDummyClick = (userName) => {

        ORDER_ID = tempId;

        setName(userName);
        setPurchaseID(ORDER_ID);
        setTotalCost(2665);
        setBookData(fakePurchasedBooks);
        setMessage("Thank you for purchasing !");
        setDataAvailable(true);

    };

    return (
        <div>
            <Navbar
                setUserName={props.setUserName}
                userName={props.userName}
            />

            <h1 className='center-text'>MY Orders</h1>
            <div className="search-container flex">
                <input type="text" placeholder='Enter the orderID...' onChange={(e) => { tempId = parseInt(e.target.value); }} />
                <button onClick={handleClick}>Get Details</button>
                <button onClick={ () => handleDummyClick(props.userName)}>Get DUMMY Details</button>
            </div>
            <div>
                {
                    dataAvailable && <OrderDetail
                        name={name}
                        purchaseID={purchaseID}
                        totalCost={totalCost}
                        bookData={bookData}
                        message={message}
                    />
                }
            </div>
        </div>
    );
};