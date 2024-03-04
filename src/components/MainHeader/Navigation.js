import React from "react";

import "./Navigation.css";
import { AuthStore } from "../../store/auth-context";

const Navigation = () => {
  return (
    <AuthStore.Consumer>
      {(AuthStr) => {
        return (
          <nav className="nav">
            <ul>
              {AuthStr.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {AuthStr.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {AuthStr.isLoggedIn && (
                <li>
                  <button onClick={AuthStr.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        );
      }}
    </AuthStore.Consumer>
  );
};

export default Navigation;
