import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cards from './Cards';
import CMockData from './Classes/Webservices/CMockData';
import { IWebservice } from './Interfaces';

const oWebservice:IWebservice = new CMockData();

function App() {
  return (
    <Cards oWebservice={oWebservice} />
  );
}

export default App;
