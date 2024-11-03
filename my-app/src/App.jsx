import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import Account from "./pages/account";
import Navbar from './components/Navbar';
import List from './pages/list';
import Explore from './pages/explore';

function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Account />} />
              <Route path="/list" element={<List />} />
              <Route path="/explore" element={<Explore />} />
          </Routes>
      </Router>
  );
}

export default App;
