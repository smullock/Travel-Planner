import React, {useState} from 'react'
import Navbar from '../Components/Navbar';
import TripItems from '../Components/TripItems';
import ItemFormModal from '../Components/ItemFormModal';

function Home() {
  const [items, setItems] = useState([]);

  const handleSubmit = (values) => {
    setItems([...items, values]);
  };

  return (
    
    
    <div>
      <h1>Welcome to the Home page</h1>
      <ItemFormModal handleSubmit={handleSubmit} />
    </div>
   
  )
}

export default Home