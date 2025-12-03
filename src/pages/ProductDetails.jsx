import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";   // ✅ FIX
import { getProduct } from "../api/productApi"; // ✅ FIX
import { addToCart } from "../api/cartApi";     // ✅ FIX

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch(() => setProduct(null));
  }, [id]);

  const handleAdd = async () => {
    try {
      await addToCart(id, qty);
      alert("Added to cart");
    } catch (e) {
      alert("Failed to add");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="row">
      <div className="col-md-5">
        <img
          src={product.image || "https://via.placeholder.com/400x300"}
          className="img-fluid rounded"
          alt={product.name}
        />
      </div>

      <div className="col-md-7">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h4 className="text-success">₹{product.price}</h4>

        <div className="d-flex align-items-center mt-3">
          <label className="me-2">Quantity:</label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="form-control w-auto"
          />
        </div>

        <button className="btn btn-primary mt-3" onClick={handleAdd}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
