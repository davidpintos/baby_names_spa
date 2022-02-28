import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BabiesAppContextProvider from './BabiesAppContext';

import './App.css';

function App() {
  return (
    <Router>
        <div className="App">
          <BabiesAppContextProvider>
            <Routes>
                <Route exact path='/' element={< Home />}></Route>
                <Route exact path='/:listId' element={< Home />}></Route>
            </Routes>
          </BabiesAppContextProvider>
        </div>
    </Router>
  );
}

export default App;
