import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import store from "./redux/store";

const App = () => {
 
  return (
    <Provider store={store}>
      <div className="App">
          <AppRouter/>
      </div>
    </Provider>
  );
}

export default App;
