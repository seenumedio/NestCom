import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

function Navbar() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [loggedIn, setLoggedIn] = useState(true);

    const handleClick = () => {
        if (loggedIn) {
            localStorage.removeItem('user');
            setLoggedIn(false);
        } else navigate('/auth');
    }

    useEffect(() => {
        setLoggedIn(user ? true : false)
    }, [user])
    return (
        <div className='w-[100vw] bg-gradient-to-r from-indigo-500 to-purple-600 p-6 sticky top-0 z-25 h-[10vh] flex items-center justify-between shadow-lg'>
            <NavLink
                to='/'
                className='text-white text-2xl font-bold tracking-wide hover:scale-105 transition-transform duration-200'
            >
                NestCom
            </NavLink>

            {/* Desktop */}
            <div className='hidden sm:flex gap-6 items-center'>
                <NavLink
                    to='/'
                    className='text-white font-medium hover:text-indigo-200 transition-colors duration-200'
                >
                    Posts
                </NavLink>

                <NavLink
                    to='/addPost'
                    className='text-white font-medium hover:text-indigo-200 transition-colors duration-200'
                >
                    Add Post
                </NavLink>

                <button
                    className={`${loggedIn ? 'bg-red-400 text-white' : 'bg-white text-indigo-600'} font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-indigo-100 hover:shadow-lg transition-all duration-200`}
                    onClick={handleClick}
                >
                    {loggedIn ? 'Sign Out' : 'LogIn'}
                </button>
            </div>

            {/* Hamburger Icon for Mobile */}
            <div className='sm:hidden flex items-center'>
                <button onClick={() => setSidebarOpen(true)}>
                    <FaBars className='text-white text-2xl' />
                </button>
            </div>

            {/* Mobile */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-indigo-500 text-white transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='flex justify-end p-4'>
                    <button onClick={() => setSidebarOpen(false)}>
                        <FaTimes className='text-white text-2xl' />
                    </button>
                </div>
                <nav className='flex flex-col gap-6 p-4'>
                    <NavLink
                        to='/'
                        className='hover:text-indigo-200'
                        onClick={() => setSidebarOpen(false)}
                    >
                        Posts
                    </NavLink>
                    <NavLink
                        to='/addPost'
                        className='hover:text-indigo-200'
                        onClick={() => setSidebarOpen(false)}
                    >
                        Add Post
                    </NavLink>
                    <button
                        className={`${loggedIn ? 'bg-red-400 text-white' : 'bg-white text-indigo-600'} font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-indigo-100 hover:shadow-lg transition-all duration-200`}
                        onClick={() => { setSidebarOpen(false); handleClick() }}
                    >
                        Sign Out
                    </button>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
