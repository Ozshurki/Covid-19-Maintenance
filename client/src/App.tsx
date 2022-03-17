import React from 'react';
import {Routes, Route} from 'react-router-dom';
import FormPage from "./Pages/FormPage";
import TablePage from "./Pages/TablePage";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <div className="App">
        <ScrollToTop/>
        <Routes>
            <Route path="/" element={<FormPage/>}/>
            <Route path="/citizens" element={<TablePage/>}/>
        </Routes>
    </div>
  );
}

export default App;
