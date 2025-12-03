import React, { useEffect, useState } from 'react';
import { getCart, addToCart, placeOrder } from '../api/cartApi';

export default function Cart(){
  const [cart, setCart] = useState({ items: [] });
  useEffect(()=>{ getCart().then(setCart).catch(()=>setCart({items:[]})); },[]);

  const handlePlace = async ()=>{
    try{ await placeOrder(); alert('Order placed'); }catch(e){ alert('Order failed'); }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.items.length === 0 ? <p>No items</p> : (
        <div>
          {cart.items.map(ci => (
            <div key={ci.product.id} className="card mb-2 p-2">
              <div className="d-flex justify-content-between">
                <div>{ci.product.name} x {ci.quantity}</div>
                <div>₹{ci.product.price * ci.quantity}</div>
              </div>
            </div>
          ))}
          <button className="btn btn-primary mt-3" onClick={handlePlace}>Place Order</button>
        </div>
      )}
    </div>
  );
}