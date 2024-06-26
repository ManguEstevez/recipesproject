import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider'; // Ensure this hook is correctly imported

function Signup() {
  const { handleSignup } = useAuth(); // Assuming you have a handleSignup function in your AuthProvider
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessages] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await handleSignup(username, email, firstName, lastName, password);
    
    if (password !== confirmPassword) {
      setMessages('Passwords do not match.');
      return;
    }


    if (response.success) {
      setMessages(response.message);
      navigate('/login'); // Redirect to login page on success
    } else {
      setMessages(response.message || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center pt-2">
        <div className="col-lg-6 col-md-8 d-flex flex-column align-items-center justify-content-center">
          <div className="card mb-3">
            <div className="card-body">
              <div className="pb-1">
                <h5 className="card-title text-center pb-0 fs-4">Create Your Account</h5>
              </div>
              {message && (
                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`} role="alert">
                  {message}
                </div>
              )}
              <form onSubmit={onSubmit} className="row g-3">
                <div className="col-12 d-flex">
                  <div className="col-3 col-md-2">
                    <label className="form-label">Username</label>
                  </div>
                  <div className="col-9 col-md-10">
                    <div className="input-group">
                      <span className="input-group-text">🧍</span>
                      <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex">
                  <div className="col-3 col-md-2">
                    <label className="form-label">Email</label>
                  </div>
                  <div className="col-9 col-md-10">
                    <div className="input-group">
                      <span className="input-group-text">📧</span>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex">
                  <div className="col-3 col-md-2">
                    <label className="form-label">First Name</label>
                  </div>
                  <div className="col-9 col-md-10">
                    <div className="input-group">
                      <span className="input-group-text">🔷</span>
                      <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex">
                  <div className="col-3 col-md-2">
                    <label className="form-label">Last Name</label>
                  </div>
                  <div className="col-9 col-md-10">
                    <div className="input-group">
                      <span className="input-group-text">🔷</span>
                      <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex">
                  <div className="col-3 col-md-2">
                    <label className="form-label">Password</label>
                  </div>
                  <div className="col-9 col-md-10">
                    <div className="input-group">
                      <span className="input-group-text">🔑</span>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex">
                  <div className="col-3 col-md-2">
                    <label className="form-label">Confirm Password</label>
                  </div>
                  <div className="col-9 col-md-10">
                    <div className="input-group">
                      <span className="input-group-text">🔑</span>
                      <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <button id="register-btn" className="btn btn-primary w-100 font-weight-bold" type="submit">Create Account</button>
                </div>
              </form>
              <div className="col-12 mt-3">
                <p className="small mb-0">Do you have an account? <Link to="/login">Log In</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
