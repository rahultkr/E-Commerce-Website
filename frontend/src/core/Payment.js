import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

import { loadCart, clearCart } from "./helper/CartHelper";
import { getmeToken, processPayment } from "./helper/paymenthelper";
import { isAuthenticated } from "../auth/helper";
import { createOrder } from "./helper/orderhelper";


const Payment = ({ products, setReload = (f) => f, reload = undefined }) => {

  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "", 
    instance:{}
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;


  const getToken = (userId, token) => {
    getmeToken(userId,token)
      .then(data => {
        if (data.error) {
          setInfo({ ...info, error: data.error });
        }
        else{
          setInfo({ clientToken: data.clientToken });
        }
    })

  }

  const showDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
           <div>
          <DropIn
            options={{ authorization: info.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
          <button className="btn btn-danger px-4 rounded"  onClick={onPurchase}>Buy</button>
        </div>
        ) : (
            <h3>Please login or add something to cart</h3>
      )}
      </div>
    )
  }

  useEffect(() => {
    getToken(userId, token);
  }, []);


  const onPurchase = () => {
    setInfo({ loading: true })
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then(data => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce : nonce,
          amount: getAmount()
        };

        processPayment(userId, token, paymentData)
          .then(res => {
            setInfo({ ...info, success: res.success, loading: false });
            
            clearCart(() => {
              console.log('PAYMENT SUCCESS');

              const orderData = {
                products: products,
                transaction_id: res.transaction.id,
                amount: res.transaction.amount
              }

              createOrder(userId, token, orderData);
            });

            setReload(!reload);
          })
          .catch(error => {
            console.log('payment failed');
            console.log(error);
          setInfo({loading:false,success:false})
        })
    })
  }

  const getAmount = () => {
    let amount = 0;
    products.map(product => {
      amount = amount + product.price;
    })
    return amount;
  }
  return (
    <div className="mb-4">
      <h3 className="mb-3">Your bill is {getAmount()}</h3>
    {showDropIn()}
    </div>
  )
};

export default Payment;
