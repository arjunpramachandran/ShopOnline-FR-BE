import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { loginUser, logoutUser } from './authSlice'
import { useDispatch } from 'react-redux'



const SignUp = () => {
    const dispatch = useDispatch()
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""

    })
    const handleChange = (e) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const { name, email, password , phone } = data
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Invalid email format")
                return;
            }
            if (password.length < 8) {
                alert("Password must be at least 8 characters long")
                return;
            }
            // console.log(data)

            const response = await axios.post('https://shoponline-be.onrender.com/user', data)
            console.log(response, '===response');
            console.log("RESPONSE DATA:", response.data);

            navigate('/login')






        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }

        }

    }
    return (
        <div>
            <section className="auto" >
                <div className="container py-4  ">
                    <div className="row d-flex justify-content-center align-items-center h-100 ">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black shadow p-3 mb-5 bg-white " style={{ borderRadius: '25px' }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                            {error && (
                                                <div className="alert alert-danger text-center mb-3" role="alert">
                                                    {error}
                                                </div>
                                            )}
                                            <form className="mx-1 mx-md-4">

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                        <input type="text" name='name' id="form3Example1c" className="form-control" onChange={handleChange} />
                                                        <label className="form-label" for="form3Example1c">Your Name</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                        <input type="email" name='email' id="form3Example3c" className="form-control" onChange={handleChange} />
                                                        <label className="form-label" for="form3Example3c">Your Email</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" name='password' id="form3Example4c" className="form-control" onChange={handleChange} />
                                                        <label className="form-label" for="form3Example4c">Password</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                        <input type="tel" name='phone' id="form3Example4cd" className="form-control" onChange={handleChange} />
                                                        <label className="form-label" for="form3Example4cd">Phone Number</label>
                                                    </div>
                                                </div>

                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" required />
                                                    <label className="form-check-label" for="form2Example3">
                                                        I agree all statements in <a href="#!">Terms of service</a>
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-lg">Register</button>
                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="public/online-shopping-man-sitting-hood-orders-goods-via-smartphone-hand-drawn-colorful-cartoon_218179-1556.jpg"
                                                className="img-fluid" alt="Sample image" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignUp