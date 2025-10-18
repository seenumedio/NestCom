import { useState } from 'react';
import { registerUser } from '../features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const user = await registerUser(username.trim(), email.trim(), password.trim());
      console.log('Registered user:', user);
      // Reset form
      setUsername('');
      setEmail('');
      setPassword('');
      toast.success('SignUp successful')
      // Redirect after successful registration
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 bg-neutral-100 rounded-md shadow-md">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="border p-2 rounded"
      />
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
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default Register;
