// import React, { useState}  from "react";
import ReactDOM  from "react-dom/client";
import AppRouter from "./AppRouter";

function Game(){
  return <>
  <AppRouter/>
  </>
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Game/>)