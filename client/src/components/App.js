import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";

const Dashboard = () => {
  <h2>D</h2>;
};
const SurveyNew = () => {
  <h2>SN</h2>;
};
const Landing = () => {
  <h2>L</h2>;
};

const App = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/surveys/new" component={SurveyNew} />
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
