import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';
import bgImage from '../assets/img/register-bg.jpg';
import registercontainerbg from '../assets/img/register-container-bg.png';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e) => {
  e.preventDefault();
  try {
    const data = await loginApi(email, password); // this returns token
    // login (context) will fetch profile; await it
    await login(data.token, rememberMe);
    nav('/');
  } catch (err) {
    console.error(err);
    alert('Login failed');
  }
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
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-center">Login</h3>

            <form onSubmit={submit} className="mt-5">
           <div className="mb-3"><input className="form-control" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
<div className="mb-3"><input className="form-control" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
<div className="form-check mb-3">
  <input type="checkbox" className="form-check-input" id="remember" 
         checked={rememberMe} 
         onChange={e => setRememberMe(e.target.checked)} />
  <label className="form-check-label" htmlFor="remember">Remember Me (7 days)</label>
</div>
<button className="btn btn-primary">Login</button>
         </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}
