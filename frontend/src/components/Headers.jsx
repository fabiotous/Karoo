import { useNavigate } from 'react-router-dom';

const Headers = () => {
    const navigate = useNavigate();
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
                <div className="search-bar">
                    <input type="text" id="searchInput" placeholder="Search products..."/>
                    <button id="searchBtn">🔍</button>
                </div>
            </td>

            <td onClick={() => navigate('/underconstruction')}>
                Hello, Sign in
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