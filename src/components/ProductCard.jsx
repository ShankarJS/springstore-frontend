import React from 'react';
import { Link } from 'react-router-dom';
//import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export default function ProductCard({p}){
const { updateCartCount } = useContext(CartContext);
  //const nav = useNavigate();

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === p.id);

    if (existing) {
      if (existing.qty >= p.stock) {
        alert(`Only ${p.stock} items in stock.`);
        return;
      }
      existing.qty += 1;
    } else {
      cart.push({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.imageUrl,
        stock: p.stock,  // IMPORTANT
        qty: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
};

  

  return (
    <div className="card h-100" style={{maxwidth: "320px"}}>
      <img src={p.imageUrl || 'https://via.placeholder.com/300x200'} className="card-img-top" alt={p.name} />

      <div className="card-body">
        <h5 className="card-title">{p.name}</h5>
        <p className="card-text text-muted"><small>{p.description?.slice(0,80)}</small></p>
        <p className="fw-bold">
            In Stock: <span className="text-success">{p.stock}</span>
          </p>
      </div>

      <div className="card-footer d-flex justify-content-between bg-light">
        <button onClick={addToCart} className="btn btn-sm btn-dark">
           <i className="fa-solid fa-cart-plus"></i>
        </button>
        <span className="h5 mb-0">₹{p.price}</span>
        <Link to={`/ProductDetails/${p.id}`} className="btn btn-sm btn-warning"><i className="fa-solid fa-eye"></i></Link>
      </div>
    </div>
  );
}
