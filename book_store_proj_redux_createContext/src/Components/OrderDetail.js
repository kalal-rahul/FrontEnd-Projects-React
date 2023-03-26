export const OrderDetail = (props) => {

    return (
        <>
            <div className='order-detail-container'>
                <div className='order-detail-inner-container'>
                    <div className='center-text'>
                        <h3>{props.message}</h3>
                    </div>
                    <div className='flex deatil-head'>
                        <p>Customer Name: {props.name}</p>
                        <p>Purchase ID : {props.purchaseID}</p>
                        <p>Total Cost: Rs. {props.totalCost}/-</p>
                    </div>
                    <div className='book-detail'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sl.No</th>
                                    <th>Book Name</th>
                                    <th>Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.bookData.map((bookData, index) => {
                                        return (
                                            <tr key={index + 1}>
                                                <td>{index + 1}</td>
                                                <td>{bookData.bookName}</td>
                                                <td>{bookData.cost}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};