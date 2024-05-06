import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Bird() {
  const [bird, setBird] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  useEffect(() => {
    fetchAllBird();
  }, [])

  const fetchAllBird = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products/bird");
      setBird(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/products/bird?search=${searchTerm}`);
      if (response.data.length === 0) {
        setIsModalOpen(true); // Open modal if no products found
      } else {
        setBird(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  }

  const handleAddToCart = (productId) => {
    // Logic to add product to cart
    console.log("Added product to cart with ID:", productId);
  }

  const handleCheckout = () => {
    // Logic to proceed to checkout
    console.log("Proceeding to checkout...");
  }

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <div>
        <h1 style={{ padding: '20px 0px 3px 0px', color: '#FFFAF0' }}>Bird Products</h1>
        <div style={{ marginBottom: '20px', padding: '18px' }}>
          <div style={{ display: 'inline-block', marginLeft: '20px', margin: '10px' }}>
            <input
              type="text"
              placeholder="Search Products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '300px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button onClick={handleSearch} style={{ marginLeft: '10px', padding: '8px 16px', backgroundColor: '#1976D2', color: '#FFF', borderRadius: '5px', border: '1px solid white', cursor: 'pointer' }}>
              Search
            </button>
            <button onClick={fetchAllBird} style={{ marginLeft: '10px', padding: '8px 16px', backgroundColor: '#1976D2', color: '#FFF', borderRadius: '5px', border: '1px solid white', cursor: 'pointer' }}>
              Show All
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {bird.map((bird) => (
          <div key={bird.id} style={{ margin: '10px', padding: '10px', width: '200px', backgroundColor: '#FFFAF0', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '5px' }}>
            <img
              src={bird.img}
              alt=""
              style={{ width: '100%', height: '150px', objectFit: 'contain' }}
            />
            <div style={{ padding: '10px' }}>
              <h3 style={{ margin: '0', fontSize: '16px' }}>{bird.name}</h3>
              <p style={{ fontSize: '14px', margin: '5px 0', color: '#333' }}>{bird.description}</p>
              <p style={{ fontSize: '14px', fontWeight: '600', margin: '5px 0', color: '#1976D2' }}>Price: {bird.price}</p>
              <p style={{ fontSize: '14px', fontWeight: '550', margin: '5px 0', color: '#333' }}>Stock: {bird.stock}</p>
              <button onClick={() => handleAddToCart(product.id)} style={{ margin: '5px', padding: '8px', color: '#008000', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faShoppingCart} className="h-[23px]"/>
              </button>
              <button onClick={handleCheckout} style={{ margin: '5px', padding: '8px 16px', backgroundColor: '#1976D2', color: '#FFF', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Not Found Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: '9999' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#FFF', padding: '20px', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ margin: '0', color: '#333'}} className="text-lg">Product Not Found</h2>
            <p style={{ margin: '10px 0', color: '#333' }}>Thank you for your interest and patience.</p>
            <button onClick={handleCloseModal} style={{ padding: '8px 16px', backgroundColor: '#1976D2', color: '#FFF', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>OK</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Bird;

