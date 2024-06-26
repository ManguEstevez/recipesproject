// csrf.js

export async function fetchCsrfToken() {
    const response = await fetch('http://localhost:8000/get-csrf-token', {
      method: 'GET',
      credentials: 'include', // Important: ensures cookies are sent
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch CSRF token');
    }
  
    const data = await response.json();
    return data.csrfToken;
  }
  