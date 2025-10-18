export const registerUser = async (username, email, password) => {
  const res = await fetch('https://nestcom.onrender.com/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Registration failed');

  // Save user to localStorage immediately after registration
  // if (data) {
  //   console.log(data);
  //   localStorage.setItem('user', JSON.stringify(data.user));
  // }
  return data;
};

export const loginUser = async (email, password) => {
  const res = await fetch('https://nestcom.onrender.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log('Backend login response:', data);

  if (!res.ok) throw new Error(data.message || 'Login failed');

  if (data && typeof data === 'object') {
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data.user;
};



