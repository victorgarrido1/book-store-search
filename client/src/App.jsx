import React from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider } from "@apollo/client";

import Navbar from './components/Navbar';
import SearchBooks from './pages/SearchBooks'; 
import SavedBooks from './pages/SavedBooks'; // Example component for About page

const client = new ApolloClient({
  // Your Apollo Client configuration
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" component={SearchBooks} />
            <Route path="/saved" component={SavedBooks} />
            <Route path="*" component={() => <div>Not Found</div>} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;