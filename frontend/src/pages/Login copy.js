import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate(); // Hook para redirigir programáticamente

  console.log(localStorage.user)

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!username || !password) {
      setMessages(['Both username and password are required.']);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user', data);
        navigate('/'); // Redirigir a la página principal en caso de éxito
      } else {
        setMessages([data.message || 'Invalid credentials']);
      }
    } catch (error) {
      setMessages(['An error occurred. Please try again.']);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center pt-5">
        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div className="card mb-3">
            <div className="card-body">
              <div className="pt-4 pb-2">
                <h5 className="card-title text-center pb-0 fs-4">Log In to Your Account</h5>
                <p className="text-center small">Enter your email & password to login</p>
              </div>
              {messages.map((msg, index) => (
                <div key={index} className="alert alert-danger" role="alert">{msg}</div>
              ))}
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12">
                  <label className="form-label">Username</label>
                  <div className="input-group">
                    <span className="input-group-text">🧍</span>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">🔑</span>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <button className="btn btn-primary w-100 font-weight-bold" type="submit">Log In</button>
                </div>
              </form>
              <div className="col-12 mt-4">
                <p className="small mb-1">Don't have an account? <Link to="/signup">Create an account</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
