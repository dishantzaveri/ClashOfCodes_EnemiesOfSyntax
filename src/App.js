import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect } from "react";
import Package from "./pages/Package";
import Maps from "./pages/Maps";
import { ALAN_API } from "./constants";
import Chat from "./pages/Chat";

function App() {
  useEffect(() => {
    alanBtn({
      key: ALAN_API,
      onCommand: (commandData) => {
        if (commandData.command === "go:back") {
          // Call the client code that will react to the received command
        }
      },
    });
  }, []);
  return (
    <div className="h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/search" element={<Search />} /> */}
        <Route path="/package/:id" element={<Package />} />
        <Route path="/maps" element={<Maps/>} />
      </Routes>
    </div>
  );
}

export default App;
