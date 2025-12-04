import React, { useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";


export default function Cart() {
  const { updateCartCount, cartCount } = useContext(CartContext);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const increaseQty = (id) => {
  const updated = cart.map(item => {
    if (item.id === id) {
      if (item.qty >= item.stock) {
        alert(`Only ${item.stock} items available.`);
        return item;
      }
      return { ...item, qty: item.qty + 1 };
    }
    return item;
  });

  setCart(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
  updateCartCount();
};

  const decreaseQty = (id) => {
    const updated = cart
      .map(item =>
        item.id === id ? {...item, qty: Math.max(1, item.qty - 1)} : item
      )
      .filter(item => item.qty > 0);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    updateCartCount();
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    updateCartCount();
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0)
    return <h3 className="mt-5 text-center">Your cart is empty</h3>;

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {cart.map(item => (
        <div key={item.id} className="card p-3 mb-2">
          <div className="d-flex justify-content-between">
            
            <div>
              <h5>{item.name}</h5>
              <p>₹{item.price}</p>

              <div className="d-flex align-items-center">
                <button className="btn btn-sm btn-secondary" onClick={() => decreaseQty(item.id)}>-</button>
                <span className="mx-3">{item.qty}</span>
                <button className="btn btn-sm btn-secondary" onClick={() => increaseQty(item.id)}>+</button>
              </div>
              <button className="btn btn-sm btn-danger mt-2" onClick={() => removeItem(item.id)}><i className="fa-solid fa-rectangle-xmark"></i> &nbsp; Remove item from cart</button>
            </div>

            <div>
              <img src={item.image} width="80"alt={item.name} />
            </div>

          </div>
        </div>
      ))}
      <h4 className="mt-4">Total Products: {cartCount}</h4>
      <h3 className="mt-4">Total: ₹{total}</h3>
    </div>
  );
}
