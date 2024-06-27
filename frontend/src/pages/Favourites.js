import React, { useEffect, useState } from 'react';
import { fetchCsrfToken  } from '../csrf'; 
import { getCurrentUser } from '../authService';

import { useAuth } from '../AuthProvider';

const Favourites = () => {
  const { isAuth } = useAuth();
  const [favourites, setFavourites] = useState([]);
  const [csrfToken, setCsrfToken] = useState('');
  const { username } = getCurrentUser();

  useEffect(() => {
    async function getToken() {
      const token = await fetchCsrfToken();
      setCsrfToken(token);
    }
    getToken();
  }, []);

  useEffect(() => {
    if (isAuth && csrfToken && username) {
      const url = new URL('http://localhost:8000/favourites');
      url.searchParams.append('username', username);

      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        credentials: 'include',
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setFavourites(data.favourites);
        }
        else {
            console.error(data.message || 'Failed to fetch favorites');
        }
      });
    }
  }, [isAuth, csrfToken]);

  return (
    <div className="container mt-4">
      <h2 className="my-4 text-center">⭐ Your Favourite Recipes ⭐</h2>
      <div className="row justify-content-center">
        {favourites.map((recipe) => (
          <div key={recipe.idMeal} className="col-md-6 mb-4">
            <div className="card h-100 favourite-card">
              <img src={recipe.strMealThumb} className="card-img-top" alt={recipe.strMeal} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{recipe.strMeal}</h5>
                <p className="card-text"><strong>Category:</strong> {recipe.strCategory}</p>
                <p className="card-text"><strong>Area:</strong> {recipe.strArea}</p>
                <h4>Instructions</h4>
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
        ))}
      </div>
    </div>
  );
};

export default Favourites;