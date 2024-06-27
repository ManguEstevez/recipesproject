import React, { useState, useEffect } from 'react';
import { fetchCsrfToken  } from '../csrf'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { getCurrentUser } from '../authService';


const RecipesResult = () => {
  const { isAuth } = useAuth();
  const location = useLocation();
  const { recipes } = location.state || {};
  const [csrfToken, setCsrfToken] = useState('');
  const { username } = getCurrentUser();

  useEffect(() => {
    async function getToken() {
      const token = await fetchCsrfToken();
      setCsrfToken(token);
      console.log('CSRF Token:', token); // Ensure the token is printed
    }
    getToken();
  }, []);

  const navigate = useNavigate();

  const handleAddToFavourites = async (recipeId) => {
    if (!isAuth) {
      alert('You must be logged in to add favourites.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/favourites/add/${recipeId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/favourites');
      } else {
        alert(data.message || 'Failed to add recipe to favourites.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };


  if (!recipes) {
    return <p>No recipe data available.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        {recipes.map((recipe, index) => (
          <div key={index} className="col-lg-8 mb-4">
            <div className="card recipe-card">
              <div className="card-body">
                <div className="recipe-header">
                  <h5 className="card-title">{recipe.strMeal}</h5>
                  {isAuth && (
                    <button
                      onClick={() => handleAddToFavourites(recipe.idMeal)}
                      className="btn btn-secondary"
                    >
                      Add to Favourites
                    </button>
                  )}
                </div>
                <div className="recipe-content">
                <div className="recipe-media mb-3 d-flex flex-wrap">
                <div className="recipe-img-wrapper">
                  <img className="recipe-img img-fluid" src={recipe.strMealThumb} alt={recipe.strMeal} />
                </div>
                  {recipe.strYoutube && (
                    <div className="recipe-iframe-wrapper ms-3">
                      <iframe
                        className="recipe-iframe"
                        width="300"
                        height="200"
                        src={recipe.strYoutube}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                  </div>
                  )}
                  </div>
                  <p className="card-text"><strong>Category:</strong> {recipe.strCategory}</p>
                  <p className="card-text"><strong>Area:</strong> {recipe.strArea}</p>
                  <h3>Instructions</h3>
                  <p className="card-text">{recipe.strInstructions}</p>
                  <h4>Ingredients</h4>
                  <ul className="ingredient-list">
                    {recipe.ingredient_measure_pairs.map((pair, idx) => (
                      <li key={idx}>
                        <strong>{pair.ingredient}</strong>: {pair.measure}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesResult;