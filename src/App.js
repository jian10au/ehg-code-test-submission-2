import React from "react";
import "./App.css";
import Canvas from "./components/Canvas";

function App() {
  return (
    <div className="App">
      <Canvas />
      <p>
        Image with 32768 RGB colours - by Brian Jian Zhao for EHG code test ©{" "}
      </p>
      <p>size: 256 * 128</p>
      <p>16 AUG 2020</p>
    </div>
  );
}

export default App;
