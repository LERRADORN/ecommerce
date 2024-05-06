
import { useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/cart");
      setCartItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuantityChange = async (id, newQuantity) => {
    try {

      // Ensure newQuantity is not less than 1
      newQuantity = Math.max(newQuantity, 1);

      const response = await axios.put(`http://127.0.0.1:8000/api/cart/${id}`, { quantity: newQuantity });
      if (Array.isArray(cartItems)) {
        const updatedCartItems = cartItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: newQuantity }; // Update quantity for the matching item
          }
          return item;
        });
        setCartItems(updatedCartItems);
      } else {
        console.error("Cart items data is not an array:", cartItems);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cart/${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div style={{ textAlign: 'center', margin: '45px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }} className="pt-[0px]">
        {cartItems.map((item) => (
          <div key={item.id} style={{ margin: '10px', padding: '5px', width: '240px', backgroundColor: '#FFFAF0', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '5px' }}>
            <button onClick={() => handleDelete(item.id)} style={{ position: 'static', border: 'none', cursor: 'pointer', color: '#FFFFFF' }} className="h-[35px] w-[40px] bg-red-300 rounded-sm ml-[188px]">
            <FontAwesomeIcon icon={faTimes} />
            </button>
            <img
              src={item.img}
              alt=""
              style={{ width: '100%', height: '150px', objectFit: 'contain' }}
            />
            <div style={{ padding: '10px' }}>
              <h3 style={{ margin: '10px', fontSize: '18px' }} className="text-black">{item.name}</h3>
              <p style={{ fontSize: '14px', margin: '5px 0', color: '#333' }}>{item.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }} className="my-[10px]">
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1976D2' }} className="ml-[10px]">Price: {item.price}</p>
                    <p style={{ fontSize: '14px', fontWeight: '550', color: '#333' }} className="mr-[10px]">Stock: {item.stock}</p>
              </div>
            </div>

            <div className="flex items-center">
                <span className="py-1 px-6"> Quantity: {item.quantity}</span>
                <div className="bg-gray-300">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="text-black font-bold py-1 px-2 rounded-l mx-1">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>

                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="text-black font-bold py-1 px-2 rounded-r">
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                </div>
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded mt-[20px]">
                Checkout
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
