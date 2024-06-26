import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

const Layout = () => {
  const { isAuth, handleLogout } = useAuth();
  
  const onLogout = () => {
    handleLogout();
  };

  return (
    <>
      <header className="site-header sticky-top">
        <nav className="navbar navbar-dark navbar-expand-md">
          <div className="container-fluid">
            <Link className="my-2 ms-5" to="/" aria-label="Recipes">
              <img src="/assets/recipes-logo.png" alt="Logo" className="logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-md-end" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item mx-3">
                  <Link className="nav-link text-uppercase" to="/">Home</Link>
                </li>
                <li className="nav-item mx-3">
                  <Link className="nav-link text-uppercase" to="/recipes">Recipes</Link>
                </li>
                {isAuth && (
                  <li className="nav-item mx-3">
                    <Link className="nav-link text-uppercase" to="/favourites">Favourites</Link>
                  </li>
                )}
                {isAuth && (
                    <li className="nav-item mx-3">
                        <Link className="nav-link text-uppercase" to="/" onClick={onLogout}>Logout</Link>
                    </li>
                )}
                {!isAuth && (
                    <li className="nav-item mx-3">
                        <Link className="nav-link text-uppercase" to="/login">Login</Link>
                    </li>
                )}
                
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main id="main" className="main">
        <Outlet />
      </main>
      <footer className="footer py-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 text-center w-100 text-white">Copyright &copy; Manuel Estevez</div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;
