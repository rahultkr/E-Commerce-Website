import React from 'react'
import { useState, useEffect } from 'react';

import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';
import Payment from './Payment';


const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
      setProducts(loadCart);
    }, [reload]);

    const loadAllProducts = (products) => {
        return (
            <div>
                <h2 className='mb-4'>Yours items</h2>
                {products.map((product, index) => {
                    return (
                        <Card
                        key={index}
                        product={product}
                        addtoCart={false}
                        removeFromCart={true}
                        setReload={setReload}
                        reload={reload}    
                        />)
                })}
            </div>
        );
    }


  return (
    <Base title="Cart Page" description="Welcome to your cart">
      <div className="row text-center">
              <div className="col-6">
                  {products.length > 0 ?
                      loadAllProducts(products) :
                      (
                          <h3>No products in cart</h3>
              )}
              </div>
              <div className="col-6">
                  <Payment products={products} setReload={setReload} reload={reload} />
              </div>
      </div>
    </Base>
  );
}

export default Cart