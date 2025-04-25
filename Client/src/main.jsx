import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Root from './Root.jsx';
import ErrorPage from './ErrorPage.jsx';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AllProducts from './AllProducts.jsx';
import ProductDetails from './ProductDetails.jsx';
import Login from './Login.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import SignUp from './SignUp.jsx';
import store from './store.js';
import { Provider } from 'react-redux';
import Cart from './Cart.jsx';
import NewProduct from './NewProduct.jsx';

const isAuthenticated = localStorage.getItem('token') ? true : false;


const router = createBrowserRouter([


  {
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/', element: <AllProducts /> },
      { path: '/products/:id', element: <ProductDetails /> },
     
      {
        element: <ProtectedRoute />,
        children: [

          { path: '/cart', element: <Cart /> },
          {path: '/addProduct', element: <NewProduct /> },

        ]
      }
    ]
  },

]);
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);