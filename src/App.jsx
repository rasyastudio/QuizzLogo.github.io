import { useState } from "react";
import "./App.css";
import gameLogo from "./Components/Quiz/gameLogo";
import Quiz from "./Components/Quiz/Quiz";
import CharacterChallenge from "./Components/Quiz/CharacterChallenge";



function App() {
  return (
    <>
      <Quiz />
      <gameLogo/>
      <CharacterChallenge/>
    </>
  );
}

export default App;
