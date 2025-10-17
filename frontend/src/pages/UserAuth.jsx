import { useState } from 'react'
import Register from '../components/Register'
import Login from '../components/Login'
function UserAuth() {
    const [showLogin, setShowLogin] = useState(true);
    return (
        <>
            {showLogin ? <Login setShowLogin={setShowLogin} /> : <Register />}
        </>
    )
}

export default UserAuth