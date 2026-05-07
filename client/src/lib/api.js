export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

export const setAuthToken = (username, password) => {
  const token = btoa(`${username}:${password}`);
  localStorage.setItem('auth_token', token);
  localStorage.setItem('username', username);
  return token;
};

export const clearAuthToken = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('username');
};

export const getUsername = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('username');
  }
  return null;
};

export const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Basic ${token}`;
  }

  // Use the proxied URL route in Next.js
  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearAuthToken();
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
    const text = await response.text();
    throw new Error(text || 'API Request Failed');
  }

  // Handle empty responses (like 204 No Content)
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch (e) {
    // If not JSON, return the raw text
    return text;
  }
};
