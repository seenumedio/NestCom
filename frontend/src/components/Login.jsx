import { useState } from 'react';
import { loginUser } from '../features/auth/authApi';
import { useNavigate } from 'react-router-dom';

const Login = ({ setShowLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    try {
      const user = await loginUser(email.trim(), password.trim());
      console.log('Logged in user:', user);
      navigate('/'); // redirect after login
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 bg-neutral-100 rounded-md shadow-md">
      <div className='flex justify-between'>
        <h2>Login</h2>
        <button
          className='text-blue-500 hover:underline hover:scale-102 cursor-pointer'
          onClick={(e) => {e.preventDefault(); setShowLogin(false)}}
        >SignUp</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-500 text-white p-2 rounded-md cursor-pointer hover:scale-102 hover:shadow-md"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;
