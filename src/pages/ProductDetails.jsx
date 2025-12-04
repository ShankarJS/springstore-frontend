import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/productApi";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [cartItem, setCartItem] = useState(null);

  const { updateCartCount } = useContext(CartContext);

  useEffect(() => {
    getProduct(id).then((data) => {
      setProduct(data);

      // Check product in cart
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find((item) => item.id === Number(id));

      setCartItem(existing || null);

      // If exists, show qty already in cart
      if (existing) {
        setQty(existing.qty);
      }
    });
  }, [id]);

  if (!product) return <h2 className="mt-5 text-center">Loading...</h2>;

  // Quantity Change Handling
  const changeQty = (value) => {
    if (value < 1) value = 1;
    if (value > product.stock) value = product.stock;
    setQty(value);
  };

  const handleAddOrUpdateCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      // UPDATE to new qty
      if (qty > product.stock) {
        alert(`Only ${product.stock} items available!`);
        return;
      }
      existing.qty = qty;  
    } else {
      // ADD NEW
      if (qty > product.stock) {
        alert(`Only ${product.stock} items available!`);
        return;
      }

      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        qty: qty,
        stock: product.stock
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Cart updated!");
  };

  const isDisabled = qty > product.stock;

  return (
    <div className="container mt-5">
      <div className="row p-1 pt-5 pb-5 rounded" style={{backgroundColor: "#f1f0f0"}}>

        {/* IMAGE */}
        <div className="col-md-5">
          <img
            src={product.imageUrl}
            className="img-fluid rounded"
            alt={product.name}
          />
        </div>

        {/* DETAILS */}
        <div className="col-md-7">
          <h2>{product.name}</h2>
          <p className="mt-3">{product.description}</p>
          <h3 className="text-muted">₹{product.price}</h3>

          {/* STOCK */}
          <p className="fw-bold">
            In Stock: <span className="text-success">{product.stock}</span>
          </p>

          {/* QUANTITY */}
          <div className="d-flex align-items-center mt-3">
            <button
              className="btn btn-secondary"
              onClick={() => changeQty(qty - 1)}
            >
              -
            </button>

            <input
              type="number"
              value={qty}
              min="1"
              max={product.stock}
              onChange={(e) => changeQty(Number(e.target.value))}
              className="form-control mx-2 w-auto text-center"
            />

            <button
              className="btn btn-secondary"
              onClick={() => changeQty(qty + 1)}
            >
              +
            </button>
          </div>

          {/* DISABLED MESSAGE */}
          {isDisabled && (
            <p className="text-danger mt-2">
              Qty exceeds available stock!
            </p>
          )}

          {/* BUTTON */}
          <button
            className="btn btn-dark mt-4"
            onClick={handleAddOrUpdateCart}
            disabled={isDisabled}
          >
            {cartItem ? (
              <>
                <i className="fa-solid fa-pen-to-square"></i> Update Cart
              </>
            ) : (
              <>
                <i className="fa-solid fa-cart-plus"></i> Add to Cart
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
