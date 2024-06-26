export const login = async (username, password) => {
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
            // Store user data in localStorage
            const user = {
                username: data.username,
                csrf_token: data.csrf_token,  // Include CSRF token if necessary
            };
            localStorage.setItem('user', JSON.stringify(user)); // Store user data as a JSON string
        }
        return data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const signup = async (username, email, firstName, lastName, password) => {
    try {
        const response = await fetch('http://localhost:8000/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, firstName, lastName, password }),
          });
          const data = await response.json();
          if (data.success) {
              localStorage.setItem('user', JSON.stringify(data)); // Ensure JSON format
          }
          return data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const logout = async () => {
    localStorage.removeItem('user');
    try {
        const response = await fetch(`http://localhost:8000/logout`, {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            return { success: true, message: 'Logout successful' };
        } else {
            return { success: false, message: 'Logout failed' };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
    const user = getCurrentUser();
    return user !== null;
};
