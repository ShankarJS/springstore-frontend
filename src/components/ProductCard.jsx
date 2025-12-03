import React from 'react';
import { Link } from 'react-router-dom';


export default function ProductCard({p}){
  return (
    <div className="card h-100">
      <img src={p.imageUrl || 'https://via.placeholder.com/300x200'} className="card-img-top" alt={p.name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{p.name}</h5>
        <p className="card-text flex-grow-1">{p.description?.slice(0,80)}</p>
        <div className="d-flex justify-content-between align-items-center">
          <strong>₹{p.price}</strong>
          <Link to={`/products/${p.id}`} className="btn btn-sm btn-primary">View</Link>
        </div>
      </div>
    </div>
  );
}