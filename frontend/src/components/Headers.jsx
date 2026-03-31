import { useNavigate } from 'react-router-dom';
import SearchProduct from './SearchProduct';

const Headers = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/home');
    };
  return (
    <>
    <table className="header-table">
    <tbody>
    <tr>
            <td onClick={() => navigate('/home')}>
                <div className="logo-container">
                    <img src="/images/logo.png" alt="Logo"/>
                </div>
            </td>

            <td>
               <SearchProduct></SearchProduct>
            </td>

            <td>
                {token ? (
                    <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                        Sign Out
                    </span>
                ) : (
                    <span onClick={() => navigate('/signin')} style={{ cursor: "pointer" }}>
                        Hello, Sign In
                    </span>
                )}
            </td>

            <td onClick={() => navigate('/cart')}>
                🛒 Cart
            </td>
        </tr>
    </tbody>
    </table>

    <table className="nav-table">
        <tbody>
        <tr>
            <td onClick={() => navigate('/home')}>Home</td>
            <td onClick={() => navigate('/about')}>About</td>
            <td onClick={() => navigate('/underconstruction')}>Best Sellers</td>
            <td onClick={() => navigate('/electronics')}>Electronics</td>
            <td onClick={() => navigate('/underconstruction')}>Beauty</td>
            <td onClick={() => navigate('/underconstruction')}>Apparel</td>
        </tr>
        </tbody>
    </table>
    </>
  )
}

export default Headers