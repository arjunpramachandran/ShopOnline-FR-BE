import React, { useState, useReducer, useEffect, useRef } from "react";
import { Link } from 'react-router-dom'
import './AllProducts.css'
import axios from 'axios'

const AllProducts = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/products')
        .then((response) => {
            setProducts(response.data);
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
}, []);

    function roundToNearestTen(num) {
        return Math.round(num / 10) * 10;
    }

    //Timer for Flash Sale

    const timerReducer = (state, action) => {
        switch (action.type) {
            case 'TICK':
                let { days, hours, minutes, seconds } = state;

                if (seconds === 0) {
                    if (minutes === 0) {
                        if (hours === 0) {
                            if (days === 0) {
                                return state; // Timer is finished
                            } else {
                                days -= 1;
                                hours = 23;
                                minutes = 59;
                                seconds = 59;
                            }
                        } else {
                            hours -= 1;
                            minutes = 59;
                            seconds = 59;
                        }
                    } else {
                        minutes -= 1;
                        seconds = 59;
                    }
                } else {    
                    seconds -= 1;
                }

                return { days, hours, minutes, seconds };

            default:
                return state;
        }
    };
    const initialState = { days: 1, hours: 15, minutes: 27, seconds: 60 };
    const [state, dispatch] = useReducer(timerReducer, initialState);
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            dispatch({ type: 'TICK' });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, []);

    const { days, hours, minutes, seconds } = state;
    return (


        <div className='container mt-4 products'>

            {/* <div className="row offer">
                <div className="row deal">
                    <div className="col-md-6">
                        <img src="./R.png" alt="" />
                    </div>
                    <div className="col-md-6">
                        <div className="offer-time">
                            <p>Offer End At</p>
                            <ul className="flexcenter time" id="timer">
                                <li>{days}</li>
                                <li>{hours}</li>
                                <li>{minutes}</li>
                                <li>{seconds}</li>
                            </ul>
                            <ul className="flexcenter code" >
                                <li>Day</li>
                                <li>Hr</li>
                                <li>Mnt</li>
                                <li>Sec</li>
                            </ul>
                        </div>

                    </div>
                </div>


                {products.length > 1 && (
                    <div key={products[1].id} className='col-lg-3 col-md-6 mb-4'>
                        <Link to={`/products/${products[1].id}?discount=70`} className='text-decoration-none'>
                            <div className='card shadow-sm p-3'>
                                <img src={products[1].imageUrl} className='card-img-top' alt="" />
                                <h5 className='card-title'>{products[1].name}</h5>
                                <p >
                                    <span className='price'>Rs. {roundToNearestTen(products[1].price  )}.00 </span>
                                    <span className='mrpPrice'>{roundToNearestTen((products[1].price  ) * 1.70)}.00</span>
                                    <span className='discount'>70%</span>
                                </p>
                            </div>
                        </Link>
                    </div>
                )}
                {products.length > 1 && (
                    <div key={products[2].id} className='col-lg-3 col-md-6  mb-4'>
                        <Link to={`/products/${products[2].id}?discount=68`} className='text-decoration-none'>
                            <div className='card shadow-sm p-3'>
                                <img src={products[18].imageUrl} className='card-img-top' alt="" />
                                <h5 className='card-title'>{products[2].name}</h5>
                                <p >
                                    <span className='price'>Rs. {roundToNearestTen(products[2].price  )}.00 </span>
                                    <span className='mrpPrice'>{roundToNearestTen((products[2].price  ) * 1.68)}.00</span>
                                    <span className='discount'>68%</span>
                                </p>
                            </div>
                        </Link>
                    </div>
                )}
                {products.length > 1 && (
                    <div key={products[3].id} className='col-lg-3 col-md-6  mb-4'>
                        <Link to={`/products/${products[3].id}?discount=55`} className='text-decoration-none'>
                            <div className='card shadow-sm p-3'>
                                <img src={products[3].imageUrl} className='card-img-top' alt="" />
                                <h5 className='card-title'>{products[3].name.substring(0, 50)}</h5>
                                <p >
                                    <span className='price'>Rs. {roundToNearestTen(products[3].price)}.00 </span>
                                    <span className='mrpPrice'>{roundToNearestTen((products[3].price ) * 1.55)}.00</span>
                                    <span className='discount'>55%</span>
                                </p>
                            </div>
                        </Link>
                    </div>
                )}
                {products.length > 1 && (
                    <div key={products[0].id} className='col-lg-3 col-md-6  mb-4'>
                        <Link to={`/products/${products[0].id}?discount=60`} className='text-decoration-none'>
                            <div className='card shadow-sm p-3'>
                                <img src={products[0].imageUrl} className='card-img-top' alt="" />
                                <h5 className='card-title'>{products[0].name.substring(0, 50)}</h5>
                                <p >
                                    <span className='price'>Rs. {roundToNearestTen(products[0].price )}.00 </span>
                                    <span className='mrpPrice'>{roundToNearestTen((products[0].price  ) * 1.60)}.00</span>
                                    <span className='discount'>60%</span>
                                </p>
                            </div>
                        </Link>
                    </div>
                )}




            </div> */}
            <h4 className='mb-4 mt-4 border-bottom'>All Products</h4>
            <div className='row'>
                {products.map((product) => (
                    <div key={product.id} className='col-lg-3 col-md-6 mb-4'>
                        <Link to={`/products/${product._id}?discount=25`} className='text-decoration-none'>
                            <div className='card shadow-sm p-3'>
                                <img src={product.imageUrl} className='card-img-top' alt="" />
                                <h5 className='card-title'>{product.name.substring(0, 50)}...</h5>

                                <p >
                                    <span className='price'>Rs. {product.price  }.00 </span>
                                    <span className='mrpPrice'>{roundToNearestTen((product.price  ) *1.25)}.00</span>
                                    <span className='discount'>25%</span>
                                  
                                </p>
                            </div>

                        </Link>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default AllProducts