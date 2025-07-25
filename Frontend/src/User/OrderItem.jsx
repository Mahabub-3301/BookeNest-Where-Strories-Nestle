
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../Seller/List.css';
import Unavbar from './Unavbar';

function OrderItem() {
  const [item, setItem] = useState({});
  const [formData, setFormData] = useState({
    flatno: '',
    city: '',
    pincode: '',
    state: '',
  });
  const fee= 99;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
     axios.get(`/api/item/${id}`)
      .then((resp) => {
        setItem(resp.data);
      })
      .catch((error) => {
        console.log("Failed to fetch item data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure item is available and contains the required properties
      if (!item || !item.userName || !item.userId || !item.description || !item.price || !item.title || !item.author || !item.genre|| !item.itemImage) {
        throw new Error('Item data is missing required properties');
      }

      const { userName, description, price,title,author,genre,itemImage,userId } = item;
     
      const totalAmount = parseInt(price, 10) + 99;

      // Add the item properties to the formData
      const updatedFormData = {
        ...formData,
        totalamount: totalAmount,
        seller: userName,
        sellerId:userId,
        description: description,
        booktitel:title,
        bookauthor:author,
        bookgenre:genre,
        itemImage:itemImage,
      };

      // You can add user-specific data here
      const userid = JSON.parse(localStorage.getItem('user')).id;
      const username = JSON.parse(localStorage.getItem('user')).name;
      updatedFormData.userId = userid;
      updatedFormData.userName = username;

      // Post the updatedFormData
      await axios.post('/api/userorder', updatedFormData);
      console.log(updatedFormData);
      alert('Ordered successfully');
      navigate('/myorders');
    } catch (error) {
      console.error('Error adding bike insurance:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '' }}>
      <Unavbar />
       <div style={{ display: 'flex ' }} >
         <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-lg bg-white">
           <h2 className="text-2xl font-semibold" >Your order is almost Done! </h2>
           {/* <p>item name:{item.itemtype}</p> */}
           <form onSubmit={handleSubmit}>
        
   <div >
   <label className="block text-gray-600 text-center" style={{paddingTop:"10px"}}>Address:</label>
     <div class="input-container">
   
       <input type="text" id="myInput"  class="w-48 p-2 border border-gray-300 rounded focus:outline-none" placeholder=" "style={{width:"340px"}} 
      name="flatno"
      value={formData.flatno}
      onChange={handleChange}
     />
      <label for="myInput"  class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform">
        Flat no
      </label>
    </div>
  </div><br/>
 <div style={{display:"flex",justifyContent:"space-between"}}>
 <div >
    <div class="input-container">
      <input type="text" id="myInput"  class="w-48 p-2 border border-gray-300 rounded focus:outline-none" placeholder=" "
      style={{width:"140px"}} 
     name="city"
      value={formData.city}
      onChange={handleChange}
     />
      <label for="myInput"  class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform">
        City
      </label>
    </div>
  </div> 
  <div >
    <div class="input-container">
      <input type="text" id="myInput"  class="w-48 p-2 border border-gray-300 rounded focus:outline-none" placeholder=" "
      style={{width:"140px"}} 
      name="pincode"
      value={formData.pincode}
      onChange={handleChange}
     />
      <label for="myInput"  class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform">
        Pincode
      </label>
    </div>
  </div>
 </div>
  <br/>
  <div >
    <div class="input-container">
      <input type="text" id="myInput"  class="w-48 p-2 border border-gray-300 rounded focus:outline-none" placeholder=" "style={{width:"340px"}} 
      name="state"
      value={formData.state}
      onChange={handleChange}
     />
      <label for="myInput"  class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform">
        State
      </label>
    </div>
  </div> <br/>
             {item && (
                <div>
                  <div style={{ display: "flex", justifyContent: "flex-end", height: "100%",width:"100%" }} >
                  <div style={{ height: "100px",width:"50px" }} >
                        <img src={`/${item?.itemImage}`} alt={`${item.itemtype} Image`} />
                        {/* <p className='text-end'>{item.itemtype}-{item._id.slice(3, 7)}</p> */}
                        <p className='text-end'>{item.itemtype}-{item._id ? item._id.slice(3, 7) : ''}</p>
                    </div>
                  </div>
                  
                    <div style={{ display:'flex',justifyContent:"space-between" }}>
                            <p style={{ fontSize: "17px" }}>Price:</p>
                            <p>{item.price}</p>
                    </div>  
                        <div style={{ display:'flex',justifyContent:"space-between" }}>
                            <p style={{ fontSize: "17px" }}>Delivery:</p>
                            <p>Free</p>
                        </div>
                        <div style={{ display:'flex',justifyContent:"space-between" }}>
                            <p style={{ fontSize: "17px" }}>Total Amount:</p>
                            <p> {parseInt(item.price, 10) +15}</p>
                        </div>
                </div>
            )}
            <button
              type="submit"
              style={{ width: "340px" }}
              className="bg-blue-400 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Order
            </button>
          </form>
        </div>
      </div>         
    </div>
  );
}

export default OrderItem;
