import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-div position-relative overflow-hidden p-3 h-100 text-center bg-light align">
      <div className="col-md-8 p-lg-5 mx-auto my-5">
        <h1 className="display-4 home-text">Welcome</h1>
        <p className="lead secondary-text">
          Your culinary hub for global flavors. Explore our diverse recipes, connect with fellow foodies, and unleash your inner chef today!
        </p>
        {/* Using Link component for internal navigation */}
        <Link to="/recipes" className="btn btn-secondary">
          Search for a recipe 🔍
        </Link>
      </div>
    </div>
  );
}

export default Home;
