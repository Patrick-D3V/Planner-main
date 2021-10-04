import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cards from './Cards';
import CMockData from './Classes/Webservices/CMockData';
import { eSaveType, IWebservice } from './Interfaces';
import CLocalStorage from './Classes/Webservices/CLocalStorage';

const oWebservice: IWebservice = new CLocalStorage(eSaveType.Complete);
// const oWebservice: IWebservice = new CMockData();

function App() {
    return (
        <Cards oWebservice={oWebservice} />
    );
}

export default App;
