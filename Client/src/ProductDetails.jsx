import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import Rating from './Rating'
import './AllProducts.css'




const ProductDetails = () => {
    function roundToNearestTen(num) {
        return Math.round(num / 10) * 10;
    }

    const { id } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('token') ? true : false;
   

    const queryParams = new URLSearchParams(location.search);
    const discount = queryParams.get('discount');
    const [products, setProducts] = useState(null)

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            navigate('/login')
        }
        dispatch(addToCart(products));
    };


    useEffect(() => {
        fetch(`https://shoponline-be.onrender.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProducts(data))

    }, [id])
    console.log(products);
    


    if (!products) return <div className='text-center mt-4'>Loading.. </div>
    return (
        <div className='container mt-4 mb-4'>
            <div className="row">
                <div className="col-md-6 ">
                    <img src={products.imageUrl} className='card-img-top' alt={products.title} />
                </div>
                <div className="col-md-6">
                    <div className='card shadow-lg p-4'>
                        <h3 className='card-title fw-bold' style={{ fontWeight: '100', lineHeight: '1.5', fontFamily: 'monospace' }}>{products.name}</h3>
                        <h6 style={{ fontWeight: '100', lineHeight: '1.5', fontFamily: 'cursive' }}>{products.description}</h6>
                        <p >
                            <span className='price'>Rs. {products.price}.00 </span>
                            <span className='mrpPrice'>{products.price * (100 + parseInt(discount)) / 100}.00</span>
                            <span className='discount'>{discount}%</span>
                        </p>
                       
                        <div class="d-flex gap-3  justify-content-center" style={{ fontFamily: 'cursive', fontSize: '100px', color: 'white' }}>
                            <button type="button" className="btn btn-success" onClick={handleAddToCart}><img src="/add_shopping_cart.svg" alt="" /> Add To Cart</button>
                            <button type="button" className="btn btn-danger"><img src="/heart_plus.svg" alt="" /> Favourite</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDetails