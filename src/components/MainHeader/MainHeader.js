import React from "react";

import Navigation from "./Navigation";
import "./MainHeader.css";

const MainHeader = () => {
  return (
    <header className="main-header">
      <h1>A Typical Page</h1>
      <Navigation />
    </header>
  );
};

export default MainHeader;
