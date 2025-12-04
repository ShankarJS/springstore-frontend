import React, { useState } from 'react';
import { register } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/img/register-bg.jpg';
import registercontainerbg from '../assets/img/register-container-bg.png';

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    try{
      await register({ name, email, password });
      alert('Registered! Please login.');
      nav('/login');
    }catch(e){ alert('Register failed'); }
  };

  return (
  <section className="" style={{backgroundcolor: "#8fc4b7", minHeight: "93.8vh", backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-8 col-xl-6">
        <div className="card rounded-3">
          <img src={registercontainerbg}
            className="w-100" style={{bordertopleftradius: ".3rem", bordertoprightradius: ".3rem"}}
            alt="Banner" />
          <div className="card-body p-4 p-md-5">
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-center">Registration</h3>

            <form onSubmit={submit} className="mt-5">
           <div className="mb-3"><input className="form-control" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} /></div>
           <div className="mb-3"><input className="form-control" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
           <div className="mb-3"><input className="form-control" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
           <button className="btn btn-success">Register</button>
         </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}