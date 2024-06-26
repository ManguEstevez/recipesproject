import React, { useState, useEffect } from 'react';
import { fetchCsrfToken  } from '../csrf';
import { useNavigate  } from 'react-router-dom'; // Importa useNavigate
import { useAuth } from '../AuthProvider';

function Recipes() {
  const [recipeName, setRecipeName] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');


  useEffect(() => {
    async function getToken() {
      const token = await fetchCsrfToken();
      setCsrfToken(token);
      console.log('CSRF Token:', token); // Ensure the token is printed
    }
    getToken();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include', // Important: ensures cookies are sent
        body: JSON.stringify({ recipe_name: recipeName }),
      });

      const data = await response.json();

      if (data.success) {

        setRecipes(data.recipes);
        navigate('/recipes/result', { state: { recipes: data.recipes } });

      } else {

        setMessage(data.message || 'No recipes found.');
        
      }
    } catch (error) {

      setMessage('An error occurred. Please try again.');
      navigate('/recipes/error', { state: { recipeName: recipeName } });

    }
  };

  const { isAuth } = useAuth();

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 text-center">
          <h4 className='mb-3'>Search for a recipe 😋</h4>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">🍽️</span>
              <input
                id="recipe-name"
                type="text"
                className="form-control"
                placeholder="Recipe"
                aria-label="Recipe"
                aria-describedby="basic-addon1"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Search 🔍</button>
            </div>
          </form>
          {message && <p>{message}</p>}
          <div className="row">
            {recipes.map((recipe, index) => (
              <div key={index} className="col-md-4">
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{recipe.name}</h5>
                    <p className="card-text">{recipe.description}</p>                                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipes;
