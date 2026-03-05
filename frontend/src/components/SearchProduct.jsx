import { useState } from 'react';

//let's search for Products by name name (we won't spend time allowing a partial search - it must be exact match)
//partial search matching would be nice to add later though ;)
function SearchProduct() {
  //set up our state variables
  const [title, setname] = useState('');
  const [Products, setProducts] = useState([]);
  const [searched, setSearched] = useState(false);

  //function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //trim whitespace and check for empty input
    if (!title.trim()) {
      alert('Please enter an product name');
      return;
    }

    //use a try statement to catch any errors during the fetch
    try {
      //let's make the fetch call to our backend API
      //we use url encoding to handle special characters in name names
      //we must encode as we can't have characters like spaces in the URLs and the node/express backend will decode
      const response = await fetch(`/api/products/search?title=${encodeURIComponent(title)}`);
      const result = await response.json();
      
      //if the response is successful, we update our Products state with the results and set searched to true to show results
      if (response.status === 200) {
        setProducts(result);
        setSearched(true);
      } else {
        alert('Error: ' + result.error);
        setProducts([]);
        setSearched(true);
      }
    } catch (error) {
      console.error('Error searching Products:', error);
      alert(`An error occurred while searching for Products. ${error.message}`);
    }
  };

  return (
    <>
      <div id="search-Product" className="search-bar">
        <h2>Search Products by name</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Enter product name" 
            value={title}
            //onChange={(e) => setname(e.target.value)} //this is a more concise way to write the onChange handler, but we don't want teh results to show until we submit the form
            onChange={(e) => {
              setname(e.target.value);
              setSearched(false);
            }}
          />
          <button type="submit">🔍</button>
        </form>
        
        {/* this is a shorthand way of saying if searched is true, render the following block */
        /* is a short form of a ternary operator when you only care about the "true" case */
        /* instead of writing searched ? (...) : null we can just write searched && (...) */}
        {searched && (
          <>
            {Products.length > 0 ? (
              <div id="search-results">
                <h3>Search Results for "{title}"</h3>
                {Products.map(Product => {
                  const imageName = (Product.hasImage ? Product.name : 'PlaceholderProduct') + '.jpg';
                  return (
                    <div key={Product.pid}>
                      <img src={`/images/electronic_products/${imageName}`} height="100" alt={Product.title} />
                      <p>
                        PID: {Product.pid}, name: {Product.title}, 
                        price: {Product.price}, stock: {Product.stock}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No Products found for name "{title}".</p>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default SearchProduct;
