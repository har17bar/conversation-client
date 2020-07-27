import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Chat from "../components/Chat/Chat";
import Join from "../components/Join/Join";

const RouterComponent = (props) => {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const token = !!localStorage.getItem("conversation#token");
    if (token) {
      setAuth(true);
    } else setAuth(false);
  }, []);

  return (
    <Router>
      <Route
        path="/"
        exact
        render={(props) => (
          <Join {...props} isAuth={isAuth} setAuth={setAuth} />
        )}
      />
      <Route
        path="/chat"
        exact
        render={(props) => (
          <Chat {...props} isAuth={isAuth} setAuth={setAuth} />
        )}
      />
    </Router>
  );
};

export default RouterComponent;
