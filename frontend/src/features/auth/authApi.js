export const registerUser = async (username, email, password) => {
  const res = await fetch('http://localhost:4000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Registration failed');

  // Save user to localStorage immediately after registration
  localStorage.setItem('user', JSON.stringify(data.user));

  return data.user;
};


export const loginUser = async (email, password) => {
  const res = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Login failed');

  localStorage.setItem('user', JSON.stringify(data.user));

  return data.user;
};

