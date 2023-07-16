import React from "react";
// App.js 
// Contains all the structures and the routes of the app


// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// importing App components
import Navbar from "./components/navbar.js";
import NotebookList from "./components/notebookList.js";
import NotebookEditor from "./components/notebookEditor.js";
 
const App = () => {
 return (
   <div>
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/" element={<NotebookList />}/>
        <Route path="/edit/:id" element={<NotebookEditor />} />
      </Routes>
   </div>
 );
};
 
export default App;