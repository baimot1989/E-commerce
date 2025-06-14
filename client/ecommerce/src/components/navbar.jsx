import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
    const user = localStorage.getItem('user');
    const { logout } = useLogout()
    return (
        <>
            <header style={{ backgroundColor: 'green' }}>
                <ul style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '0',
                    listStyleType: 'none',
                    padding: '10px'
                }}>
                    <li><img src="data:image/png;base64,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" 
                     alt=""
                     width={'20px'}
                     height={'20px'} /></li>
                    <li>
                        {user ? <div className="logout"><button onClick={logout}>Logout</button></div> :
                            <div className="login-signup">
                                <Link to={'/login'}>login</Link>
                                <Link to={'/signup'}>signup</Link>
                            </div>
                            }

                    </li>
                </ul>
            </header>
        </>
    );
}

export default Navbar;