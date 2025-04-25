import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "./cartSlice";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const total = cartItems.reduce((acc, item) => {
        return acc + roundToNearestTen(item.price * 87.15) * item.quantity;
    }, 0);
    function roundToNearestTen(num) {
        return Math.round(num / 10) * 10;
    }

    return (
        <div className="container" style={{textAlign:'center'}}>
            <h2 style={{fontFamily:'cursive' , textAlign:'center'}}>Shopping Cart</h2>
            {cartItems.length === 0 ? <p>Your cart is empty.</p> : (
                <>
                    <div className="cartPage">
                        <ul className="cart">
                            {cartItems.map((item) => (
                                <li key={item._id}>
                                    <img src={item.imageUrl} alt={item.name} width="50" />
                                    {item.name} - Rs. {roundToNearestTen(item.price)}  x {item.quantity}
                                    
                                    
                                    <button  onClick={() => dispatch(removeFromCart(item.id))}><img src="./delete-red.svg"></img></button>
                                </li>
                                
                            ))}
                        </ul>
                        <div className="total">
                            Total      Rs. {total}.00
                        </div>
                        <div class="d-flex gap-3  justify-content-center" style={{ fontFamily: 'cursive', fontSize: '100px', color: 'white' }}>
                            <button className="btn btn-info">Payment</button>
                            <button onClick={() => dispatch(clearCart())} className="btn btn-dark">Clear Cart</button>
                        </div>
                    </div>


                </>
            )}
        </div>
    );
};

export default Cart;
