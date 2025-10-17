import { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const UserAuth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {showLogin ? <Login setShowLogin={setShowLogin}/> : <Register setShowLogin={setShowLogin}/>}
    </div>
  );
};

export default UserAuth;
