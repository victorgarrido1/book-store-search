import React from "react";
import { Outlet } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//graphQL
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";


// import Navbar from "./components/Navbar";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      // populates the header session that will communicate with Apollo
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
//App.jsx: Create an Apollo Provider to make every request work with the Apollo server.

export default App;