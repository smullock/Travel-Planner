import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Header from './Components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  
  const handleSubmit = (values) => {
    // handle form submission here
    console.log(values);
  };

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      
      <div className="App">
      <Header/>
      
      {currentForm === 'login' ? <Login /> : <Register />}
        <Routes>
          <Route path="/" element={<Home handleSubmit={handleSubmit} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        </div>
      </BrowserRouter>
      </ApolloProvider>
  );
}

export default App;
