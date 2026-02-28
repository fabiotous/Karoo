import { Link } from 'react-router-dom';

const Headers = () => {
  return (
    <>
    <table className="header-table">
    <tr>
            <td onClick="location.href='homepage.html'">
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

            <td onClick="location.href='under-construction.html'">
                Hello, Sign in
            </td>
            <td onClick="location.href='under-construction.html'">
                🛒 Cart
            </td>
        </tr>
    </table>

    <table className="nav-table">
        <tr>
            <td><Link to="/home" className="nav-link">Home</Link></td>
            <td><Link to="/about" className="nav-link">About</Link></td>
            <td><Link to="/underconstruction" className="nav-link">Best Sellers</Link></td>
            <td><Link to="/electronics" className="nav-link">Electronics</Link></td>
            <td><Link to="/underconstruction" className="nav-link">Beauty</Link></td>
            <td><Link to="/underconstruction" className="nav-link">Apparel</Link></td>
        </tr>
    </table>
    </>
  )
}

export default Headers