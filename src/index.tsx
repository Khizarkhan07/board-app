import React  from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./contexts/BoardContext";
import Board from "./pages/board/board";
import Navbar from "./pages/navbar/Navbar";

const Page = () => {
  return (
    <>
      <Navbar />

      <AppProvider>
        <Board />
      </AppProvider>
    </>
  );
};

ReactDOM.render(<Page />, document.getElementById("root"));
