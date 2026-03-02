import { useNavigate } from 'react-router-dom';

const Headers = () => {
    const navigate = useNavigate();
  return (
    <>
    <table className="header-table">
    <tr>
            <td onClick={() => navigate('/home')}>
                <div className="logo-container">
                    <img src="/images/logo.png" alt="Logo"/>
                </div>
            </td>

            <td>
                <div class="search-bar">
                    <input type="text" id="searchInput" placeholder="Search products..."/>
                    <button id="searchBtn">🔍</button>
                </div>
            </td>

            <td onClick={() => navigate('/underconstruction')}>
                Hello, Sign in
            </td>
            <td onClick={() => navigate('/underconstruction')}>
                🛒 Cart
            </td>
        </tr>
    </table>

    <table className="nav-table">
        <tr>
            <td onClick={() => navigate('/home')}>Home</td>
            <td onClick={() => navigate('/about')}>About</td>
            <td onClick={() => navigate('/underconstruction')}>Best Sellers</td>
            <td onClick={() => navigate('/electronics')}>Electronics</td>
            <td onClick={() => navigate('/underconstruction')}>Beauty</td>
            <td onClick={() => navigate('/underconstruction')}>Apparel</td>
        </tr>
    </table>
    </>
  )
}

export default Headers