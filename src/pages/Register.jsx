import React, { useRef, useState } from "react";
import register from "../assets/videos/register.mp4";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo from "../assets/images/logo.png";
import { CometChat } from "@cometchat-pro/chat";
import { COMETCHAT_CONSTANTS } from "../constants";

const generateAvatar = () => {
  // hardcode list of user's avatars for the demo purpose.
  const avatars = [
    "https://data-us.cometchat.io/assets/images/avatars/captainamerica.png",
    "https://data-us.cometchat.io/assets/images/avatars/cyclops.png",
    "https://data-us.cometchat.io/assets/images/avatars/ironman.png",
    "https://data-us.cometchat.io/assets/images/avatars/spiderman.png",
    "https://data-us.cometchat.io/assets/images/avatars/wolverine.png",
  ];
  const avatarPosition = Math.floor(Math.random() * avatars.length);
  return avatars[avatarPosition];
};

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });
  const [pan, setPan] = useState(false);
  const [role, setRole] = useState("User");
  const [show, setShow] = useState(false);
  const panNumber = useRef(null);
  const clear = () => {
    setUser({
      name: "",
      number: "",
      email: "",
      password: "",
    });
    setPan(false);
  }
  const verify = () => {
    const options = {
      method: "POST",
      url: "https://pan-card-verification1.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_pan",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "15b6349dcemsh9d506902b260d0fp1b6792jsna64ed0116bd9",
        "X-RapidAPI-Host": "pan-card-verification1.p.rapidapi.com",
      },
      data: `{"task_id":"74f4c926-250c-43ca-9c53-453e87ceacd1","group_id":"8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e","data":{"id_number":"${panNumber.current.value}"}}`,
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setPan(true);
        toast.success("Pan number verified", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Pan number not valid", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  const registerVendor = () => {
    if (!pan && role === "Vendor") {
      toast.error("Please verify your PAN number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    var data = {
      "name": user.name,
      "email": user.email,
      "phone_no": user.number,
      "password": user.password,
      "confirm_password": user.password
    }

    var config = {
      method: "post",
      url: "http://127.0.0.1:8000/accounts/register/",
      data: data,
    };

    axios(config)
      .then((response) => {
        const userAvatar = generateAvatar();
        const uuid = data.email.split("@")[0];
        const user = new CometChat.User(uuid);
        user.setName(data.name);
        user.setAvatar(userAvatar);
        
        CometChat.createUser(user, COMETCHAT_CONSTANTS.AUTH_KEY).then(
          (x) => {
            console.log(x)
            localStorage.setItem("token", response.data.token);
          },
          (error) => {
            console.log("error", error);
          }
        );
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("User already exists", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        clear();
      });
  };
  return (
    <div className="">
      <ToastContainer />
      <div className="h-screen relative overflow-hidden">
        <video autoPlay loop muted className="absolute -z-10 w-screen">
          <source src={register} type="video/mp4" />
        </video>
        <div className="w-1/2 h-screen bg-gray-100/80 p-24 ml-auto">
          <Link className="flex items-center gap-2" to="/">
            <img className="w-8" src={logo} alt="" />
            <h1 className="text-2xl font-bold underline decoration-blue-500">
              tripbright
            </h1>
          </Link>
          <h1 className="text-5xl font-semibold mt-12 uppercase">
            <span className="underline decoration-blue-500">{role}</span>{" "}
            Registration
          </h1>
          {role === "User" ? (
            <div className="">
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="">
                  <h1 className="text-gray-800 font-semibold mb-3">
                    Enter Name
                  </h1>
                  <input
                    type="text"
                    className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                    placeholder="Mihir Shinde"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="">
                  <h1 className="text-gray-800 font-semibold mb-3">
                    Enter Email
                  </h1>
                  <input
                    type="text"
                    className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                    placeholder="abc@gmail.com"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div className="">
                  <h1 className="text-gray-800 font-semibold mb-3">
                    Enter Phone Number
                  </h1>
                  <input
                    type="text"
                    className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                    placeholder="1234567890"
                    value={user.number}
                    onChange={(e) =>
                      setUser({ ...user, number: e.target.value })
                    }
                  />
                </div>
                <div className="">
                  <h1 className="text-gray-800 font-semibold mb-3">
                    Enter Password
                  </h1>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                      placeholder="password"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                    <div className="absolute top-3 right-3">
                      <button onClick={() => setShow(!show)}>
                        {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 mt-8 gap-6">
                <button
                  onClick={() => setRole("Vendor")}
                  className="w-full focus:outline-none px-4 py-3 bg-gradient-to-r to-cyan-400 from-blue-800 hover:to-cyan-600 text-white rounded-lg text-sm font-semibold"
                >
                  Register as {role === "User" ? "Vendor" : "User"}
                </button>
                <button
                  onClick={() => registerVendor()}
                  className="w-full focus:outline-none px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600 text-white rounded-lg text-sm font-semibold"
                >
                  Register
                </button>
              </div>
              <h1 className="mt-4">
                Already have an account{" "}
                <Link to="/login" className="text-blue-700">
                  Login
                </Link>
              </h1>
            </div>
          ) : (
            <div className="">
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="">
                  <h1 className="text-gray-800 font-semibold mb-3">
                    Enter PAN number
                  </h1>
                  <input
                    type="text"
                    ref={panNumber}
                    className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                    placeholder="AAAAA1234A"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    disabled={pan}
                    onClick={() => verify()}
                    className={`w-full focus:outline-none px-4 py-3 ${
                      pan
                        ? "bg-gray-400"
                        : "bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600"
                    } text-white rounded-lg text-sm font-semibold`}
                  >
                    {pan ? "Verified" : "Verify"}
                  </button>
                </div>
                <div className="">
                  <h1 className="text-gray-800 font-semibold mb-3">
                    Enter Business Name
                  </h1>
                  <input
                    type="text"
                    className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                    placeholder="Dishant Tours"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="">
                  <h1 className="text-gray-800 font-semibold mb-3">
                    Enter Email
                  </h1>
                  <input
                    type="text"
                    className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                    placeholder="abc@gmail.com"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div className="">
                  <h1 className="text-gray-800 font-semibold mb-3">
                    Enter Phone Number
                  </h1>
                  <input
                    type="text"
                    className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                    placeholder="1234567890"
                    value={user.number}
                    onChange={(e) =>
                      setUser({ ...user, number: e.target.value })
                    }
                  />
                </div>
                <div className="">
                  <h1 className="text-gray-800 font-semibold mb-3">
                    Enter Password
                  </h1>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                      placeholder="password"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                    <div className="absolute top-3 right-3">
                      <button onClick={() => setShow(!show)}>
                        {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 mt-8 gap-6">
                <button
                  onClick={() => setRole("User")}
                  className="w-full focus:outline-none px-4 py-3 bg-gradient-to-r to-cyan-400 from-blue-800 hover:to-cyan-600 text-white rounded-lg text-sm font-semibold"
                >
                  Register as {role === "User" ? "Vendor" : "User"}
                </button>
                <button
                  onClick={() => registerVendor()}
                  className="w-full focus:outline-none px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600 text-white rounded-lg text-sm font-semibold"
                >
                  Register
                </button>
              </div>
              <h1 className="mt-4">
                Already have an account{" "}
                <Link to="/login" className="text-blue-700">
                  Login
                </Link>
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
