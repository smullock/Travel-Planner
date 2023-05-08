import React, {useState} from 'react'
import { useQuery } from '@apollo/client';

import TripItems from '../Components/TripItems';
import ItemFormModal from '../Components/ItemFormModal';


function Home(props) {
  const{handleSubmit}= props
 

  return (
    
    
    <div>
      <h1>Home page</h1>
      <ItemFormModal handleSubmit={handleSubmit}/>
    </div>
   
  )
}

export default Home