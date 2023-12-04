import React from "react";
import { useState,useEffect } from "react";

import { API } from "./../backend";
import Base from "./Base";
import Card from "./Card";
import { getAllProduct } from './helper/coreapicalls';

function Home() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getAllProduct().then(data => {
      if (data.error) {
        setError(data.error);
      }
      else {
        console.log(data);
        setProducts(data);
      }
    });
  }

  useEffect(() => {
    loadAllProducts();
  },[]);
  

  return (
    <Base title="home Page" description="Welcome to t-shirt store">
      <div className="row text-center">
        <h1 className="text-white text-lg mb-4">All Products</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product}/>
              </div>
          )
        })}  
        </div>
      </div>
    </Base>
  );
}

export default Home;
