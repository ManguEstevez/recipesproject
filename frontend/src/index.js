import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import App from './pages/App';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Recipes from './pages/Recipes';
import RecipesResult from './pages/RecipesResult';
import RecipeError from './pages/RecipeError';
import Home from './pages/Home';
import Favourites from './pages/Favourites'; 
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthProvider';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipes/result" element={<RecipesResult />} />
          <Route path="recipes/error" element={<RecipeError />} />
          <Route path="favourites" element={<Favourites />} /> 

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
