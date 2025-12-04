import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/productApi';
import ProductCard from '../components/ProductCard';

export default function Products(){
  const [items, setItems] = useState([]);
  useEffect(()=>{ getProducts().then(setItems).catch(()=>setItems([])); },[]);

  return (
    <section className="" >
  <div className="container py-5 h-100">
    <div className="row g-3">
  {items.map(p => (
    <div key={p.id} className="col-12 col-md-4 col-lg-3">
      <ProductCard p={p} />
    </div>
  ))}
</div>
  </div>
</section>

  );
}