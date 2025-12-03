import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    try{
      const data = await loginApi(email, password);
login(data.token);
nav('/');
    }catch(err){
      alert('Login failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <div className="mb-3"><input className="form-control" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <div className="mb-3"><input className="form-control" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}