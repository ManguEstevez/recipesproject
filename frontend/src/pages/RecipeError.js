import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const RecipeError = () => {
  const location = useLocation();
  const { recipeName } = location.state || {};

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-12 text-center">
          <h2>Recipe not found</h2>
          <p>
            The recipe named <strong>{recipeName}</strong> does not exist. Try with another keyword.
          </p>
          <Link to="/recipes" className="btn btn-primary">
            Retry search 🔍
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeError;
