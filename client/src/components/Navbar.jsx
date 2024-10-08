import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

    const {isAuthenticated, logout, user } = useAuth();
    return (
        <nav className='bg-zinc-700 mb-3 flex justify-between py-5 px-20 '>
            <Link to={isAuthenticated ? "/contacts" : "/"}>
                <h1 className='text-2xl font-bold'>Contact Manager</h1>
            </Link>
           
            <ul className='flex gap-x-2'>
                { isAuthenticated ? (
                    <>
                        <li>
                            Welcome {user.username}
                        </li>
                        <li>
                            <Link to="/add-contact"
                                className='bg-indigo-500 px-4 py-1 rounded-sm'
                            >Add Contact </Link>
                        </li>
                        <li>
                            <Link to="/" 
                                onClick={() => {logout();}}
                            >Logout </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login"
                                className='bg-indigo-500 px-4 py-1 rounded-sm'
                            >Login</Link>
                        </li>
                        <li>
                            <Link to="/register"
                                className='bg-indigo-500 px-4 py-1 rounded-sm'
                            >Register</Link>
                        </li>
                    </>
                )}
                
            </ul>
        </nav>
    );
}

export default Navbar;
