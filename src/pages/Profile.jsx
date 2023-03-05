import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStar } from "react-icons/fa";
import { Popover } from "@headlessui/react";
import Inventory from "./FriendTable/Inventory";
import Friends from "./Friends";

const Card = ({ data, setPackages }) => {
  const token = localStorage.getItem("token");
  const deletePackage = () => {
    var config = {
      method: "delete",
      url:
        "http://vismayvora.pythonanywhere.com/tourist_app/tourpackage" +
        "/" +
        data.id +
        "/",
      headers: {
        Authorization: "Token " + token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        toast.success("Package Deleted Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getPackages();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getPackages = () => {
    var config = {
      method: "get",
      url: "http://vismayvora.pythonanywhere.com/tourist_app/tourpackage",
      headers: {
        Authorization: "Token " + token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setPackages(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div key={data.id} className="w-full rounded-xl shadow-lg border">
      <img className="rounded-t-xl h-[35vh] w-full" src={data.image} alt="" />
      <div className="px-4 py-6">
        <h1 className="text-gray-600 text-xl font-bold mb-2">
          {data.package_name}
        </h1>
        <h1 className="text-gray-400 text-sm mb-4 flex items-center gap-2">
          <HiOutlineLocationMarker className="text-lg" /> {data.location.name}
        </h1>
        <div className="border-t border-b p-3 flex justify-between items-center">
          <h1 className="text-gray-400">Price:</h1>
          <h1 className="text-gray-600 text-2xl font-bold">₹ {data.price}</h1>
        </div>
        <h1 className="text-sm text-gray-600 py-4">{data.description}</h1>
        <button
          onClick={() => deletePackage()}
          className="flex items-center gap-2 text-white font-semibold uppercase rounded-full px-6 py-2 bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const theme = localStorage.getItem("color");
  const [fill, setFill] = useState(false);
  const [tripOpen, setTripOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    food_pref: "",
    dob: new Date(),
    sex: "",
  });
  const [trip, setTrip] = useState({
    destination: "",
    start_date: new Date(),
    end_date: new Date(),
    budget: 0,
    trip_type: "",
    transport: "",
    company: "",
  });
  const [tripList, setTripList] = useState([
    
  ]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    getUser();
    getTrip();
  }, []);
  const getUser = () => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:8000/pairing/user-detail/",
      headers: {
        Authorization: "Token " + token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.data);
        setUser(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
        setUser(null);
      });
  };
  const getTrip = () => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:8000/pairing/trip-detail-get/",
      headers: {
        Authorization: "Token " + token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setTripList(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setTripList(null);
      });
  };
  const submit = (e) => {
    e.preventDefault();
    let data = profileData;
    data.dob = profileData.dob.toISOString().split("T")[0];
    console.log(data);
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/pairing/user-detail/",
      headers: {
        Authorization: "Token " + token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setFill(false);
        getUser();
        toast.success("Profile Updated Successfully", {
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
        console.log(error);
      });
  };
  const submitTrip = (e) => {
    e.preventDefault();
    console.log(trip);
    let data = trip;
    data.start_date = "2023-03-07";
    data.end_date = "2023-03-09";
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/pairing/trip-detail-post/",
      headers: {
        Authorization: "Token " + token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setTripOpen(false);
        getTrip();
        toast.success("Trip Added Successfully", {
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
        console.log(error);
        setTripOpen(false);
      });
  };
  const addTrip = () => {
    if (!user) {
      toast.error("Please complete your profile first", {
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
    setTripOpen(true);
  };
  return (
    <div
      className={`w-full min-h-screen bg-gradient-to-t from-white to-${theme}-200`}
    >
      <Navbar />
      <ToastContainer />

      {user ? (
        <div className="px-24 py-12 flex">
          <div>
            <h1 className="text-xl">Hi,</h1>
            <h1 className="text-4xl font-semibold">{user.user}</h1>
            <Popover className="relative">
              <Popover.Button>
                <div className="float-right grid grid-cols-5">
                  <FaStar className="text-yellow-400 text-3xl"></FaStar>
                  <FaStar className=" text-3xl"></FaStar>
                  <FaStar className=" text-3xl"></FaStar>
                  <FaStar className=" text-3xl"></FaStar>
                  <FaStar className=" text-3xl"></FaStar>
                </div>
              </Popover.Button>
              <Popover.Overlay className="fixed inset-0 bg-black opacity-30" />
              <Popover.Panel className="absolute p-4 z-10 bg-zinc-300 rounded-lg">
                You need more than 3 rating for solo grouping
              </Popover.Panel>
            </Popover>
          </div>
        </div>
      ) : (
        <div className="px-24 py-12">
          <h1 className="text-xl">Hi,</h1>
          <h1 className="text-4xl font-semibold">User</h1>
          <div className="flex gap-2 items-center outline outline-2 outline-orange-500 rounded px-4 py-2 mt-2">
            <h1>Please complete your profile by filling the following form.</h1>
            <h1
              onClick={() => setFill(true)}
              className="cursor-pointer text-blue-600 text-sm font-semibold underline"
            >
              Form
            </h1>
          </div>
        </div>
      )}

      <div className="flex justify-between px-24">
        <h1 className="text-3xl font-semibold">Your Trips</h1>
        <button
          className={`text-gray-100 text-lg px-6 py-2 bg-emerald-500 rounded-full`}
          onClick={() => addTrip()}
        >
          Add Trip
        </button>
      </div>
      {tripList ? (
        <div className="px-24 py-12 grid grid-cols-3 gap-4">
          {tripList?.map((trip) => (
            <Link
              to={"/companion/" + trip.id}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h1 className="text-2xl font-semibold">{trip.user}</h1>
              <h1 className="text-gray-400 text-sm mt-2">
                From: {trip.start_date}
              </h1>
              <h1 className="text-gray-400 text-sm mt-2">
                To: {trip.end_date}
              </h1>
              <h1 className="text-gray-400 text-sm mt-2">
                Destination: {trip.destination}
              </h1>
              <h1 className="text-gray-400 text-sm mt-2">
                Budget: {trip.budget}
              </h1>
              <h1 className="text-gray-400 text-sm mt-2">
                Company: {trip.company}
              </h1>
              <h1 className="text-gray-400 text-sm mt-2">
                Transport: {trip.transport}
              </h1>
              <h1 className="text-gray-400 text-sm mt-2">
                Trip types: {trip.trip_type}
              </h1>
            </Link>
          ))}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <Inventory />
      <Modal
        isOpen={fill}
        onRequestClose={() => setFill(false)}
        className="w-screen h-screen flex items-center justify-center"
      >
        <div className="w-1/3 bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold">Fill Profile</h1>
          <form className="flex flex-col mt-4" onSubmit={(e) => submit(e)}>
            <h1 className="text-gray-400 mb-2">Food Preference</h1>
            <div className="flex gap-3">
              <input
                className="hidden"
                type="radio"
                name="food_pref"
                id="veg"
                value="veg"
                onClick={(e) =>
                  setProfileData({ ...profileData, food_pref: e.target.value })
                }
              />
              <label
                className={`border-2 px-3 py-2 text-sm rounded ${
                  profileData.food_pref === "veg"
                    ? "border-black font-semibold"
                    : ""
                }`}
                for="veg"
              >
                <h1 className="text-gray-800">Veg</h1>
              </label>
              <input
                className="hidden"
                type="radio"
                name="food_pref"
                id="non-veg"
                value="non-veg"
                onClick={(e) =>
                  setProfileData({ ...profileData, food_pref: e.target.value })
                }
              />
              <label
                className={`border-2 px-3 py-2 text-sm rounded ${
                  profileData.food_pref === "non-veg"
                    ? "border-black font-semibold"
                    : ""
                }`}
                for="non-veg"
              >
                <h1 className="text-gray-800">Non-Veg</h1>
              </label>
              <input
                className="hidden"
                type="radio"
                name="food_pref"
                id="jain"
                value="jain"
                onClick={(e) =>
                  setProfileData({ ...profileData, food_pref: e.target.value })
                }
              />
              <label
                className={`border-2 px-3 py-2 text-sm rounded ${
                  profileData.food_pref === "jain"
                    ? "border-black font-semibold"
                    : ""
                }`}
                for="jain"
              >
                <h1 className="text-gray-800">Jain</h1>
              </label>
              <input
                className="hidden"
                type="radio"
                name="food_pref"
                id="vegan"
                value="vegan"
                onClick={(e) =>
                  setProfileData({ ...profileData, food_pref: e.target.value })
                }
              />
              <label
                className={`border-2 px-3 py-2 text-sm rounded ${
                  profileData.food_pref === "vegan"
                    ? "border-black font-semibold"
                    : ""
                }`}
                for="vegan"
              >
                <h1 className="text-gray-800">Vegan</h1>
              </label>
              <input
                className="hidden"
                type="radio"
                name="food_pref"
                id="gluten-free"
                value="gluten-free"
                onClick={(e) =>
                  setProfileData({ ...profileData, food_pref: e.target.value })
                }
              />
              <label
                className={`border-2 px-3 py-2 text-sm rounded ${
                  profileData.food_pref === "gluten-free"
                    ? "border-black font-semibold"
                    : ""
                }`}
                for="gluten-free"
              >
                <h1 className="text-gray-800">Gluten Free</h1>
              </label>
            </div>
            <div className="flex gap-6">
              <div className="">
                <h1 className="text-gray-400 mt-4 mb-2">Sex</h1>
                <div className="flex gap-3">
                  <input
                    className="hidden"
                    type="radio"
                    name="sex"
                    id="male"
                    value="male"
                    onClick={(e) =>
                      setProfileData({ ...profileData, sex: e.target.value })
                    }
                  />
                  <label
                    className={`border-2 px-3 py-2 text-sm rounded ${
                      profileData.sex === "male"
                        ? "border-black font-semibold"
                        : ""
                    }`}
                    for="male"
                  >
                    <h1 className="text-gray-800">Male</h1>
                  </label>
                  <input
                    className="hidden"
                    type="radio"
                    name="sex"
                    id="female"
                    value="female"
                    onClick={(e) =>
                      setProfileData({ ...profileData, sex: e.target.value })
                    }
                  />
                  <label
                    className={`border-2 px-3 py-2 text-sm rounded ${
                      profileData.sex === "female"
                        ? "border-black font-semibold"
                        : ""
                    }`}
                    for="female"
                  >
                    <h1 className="text-gray-800">Female</h1>
                  </label>
                  <input
                    className="hidden"
                    type="radio"
                    name="sex"
                    id="other"
                    value="other"
                    onClick={(e) =>
                      setProfileData({ ...profileData, sex: e.target.value })
                    }
                  />
                  <label
                    className={`border-2 px-3 py-2 text-sm rounded ${
                      profileData.sex === "other"
                        ? "border-black font-semibold"
                        : ""
                    }`}
                    for="other"
                  >
                    <h1 className="text-gray-800">Other</h1>
                  </label>
                </div>
              </div>
              <div className="flex-1 mt-4 flex-grow">
                <label className="text-gray-400">Date of Birth</label>
                <DatePicker
                  className="px-4 py-2 mt-2 shadow text-sm text-gray-500 rounded focus:outline-none w-full"
                  selected={profileData.dob}
                  onChange={(date) =>
                    setProfileData({ ...profileData, dob: date })
                  }
                />
              </div>
            </div>
            <div className="flex mt-6 justify-between">
              <button
                onClick={(e) => submit()}
                className="flex items-center gap-2 bg-emerald-500 text-white font-semibold uppercase rounded-full px-6 py-2"
              >
                Submit
              </button>
              <button
                onClick={() => setFill(false)}
                className="flex items-center gap-2 bg-red-500 text-white font-semibold uppercase rounded-full px-6 py-2"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={tripOpen}
        onRequestClose={() => setTripOpen(false)}
        className="w-screen h-screen flex items-center justify-center"
      >
        <div className="w-1/2 bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold">Trip Planner</h1>
          <form className="flex flex-col mt-4" onSubmit={(e) => submitTrip(e)}>
            <div className="flex gap-4">
              <div className="flex-1">
                <h1 className="text-gray-400 mb-2">Destination</h1>
                <input
                  className="w-full bg-gray-100 px-4 py-2 rounded shadow focus:outline-none"
                  type="text"
                  placeholder="Mumbai..."
                  value={trip.destination}
                  onChange={(e) =>
                    setTrip({ ...trip, destination: e.target.value })
                  }
                />
              </div>
              <div className="flex-1">
                <h1 className="text-gray-400 mb-2">Budget</h1>
                <input
                  className="w-full bg-gray-100 px-4 py-2 rounded shadow focus:outline-none"
                  type="number"
                  min={1000}
                  value={trip.budget}
                  onChange={(e) => setTrip({ ...trip, budget: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <label className="text-gray-400">Start Date</label>
                <DatePicker
                  className="px-4 py-2 mt-2 shadow text-sm bg-gray-100 text-gray-500 rounded focus:outline-none w-full"
                  selected={trip.start_date}
                  onChange={(date) => setTrip({ ...trip, start_date: date })}
                />
              </div>
              <div className="flex-1">
                <label className="text-gray-400">End Date</label>
                <DatePicker
                  className="px-4 py-2 mt-2 shadow text-sm bg-gray-100 text-gray-500 rounded focus:outline-none w-full"
                  selected={trip.end_date}
                  onChange={(date) => setTrip({ ...trip, end_date: date })}
                />
              </div>
            </div>
            <div className="flex mt-4">
              <div className="flex-1">
                <h1 className="text-gray-400 mb-2">Transport</h1>
                <div className="flex gap-3">
                  <input
                    className="hidden"
                    type="radio"
                    name="transport"
                    id="car"
                    value="car"
                    onClick={(e) =>
                      setTrip({ ...trip, transport: e.target.value })
                    }
                  />
                  <label
                    className={`border-2 px-3 py-2 text-sm rounded ${
                      trip.transport === "car"
                        ? "border-black font-semibold"
                        : ""
                    }`}
                    for="car"
                  >
                    <h1 className="text-gray-800">Car</h1>
                  </label>
                  <input
                    className="hidden"
                    type="radio"
                    name="transport"
                    id="bike"
                    value="bike"
                    onClick={(e) =>
                      setTrip({ ...trip, transport: e.target.value })
                    }
                  />
                  <label
                    className={`border-2 px-3 py-2 text-sm rounded ${
                      trip.transport === "bike"
                        ? "border-black font-semibold"
                        : ""
                    }`}
                    for="bike"
                  >
                    <h1 className="text-gray-800">Bike</h1>
                  </label>
                  <input
                    className="hidden"
                    type="radio"
                    name="transport"
                    id="plane"
                    value="plane"
                    onClick={(e) =>
                      setTrip({ ...trip, transport: e.target.value })
                    }
                  />
                  <label
                    className={`border-2 px-3 py-2 text-sm rounded ${
                      trip.transport === "plane"
                        ? "border-black font-semibold"
                        : ""
                    }`}
                    for="plane"
                  >
                    <h1 className="text-gray-800">Plane</h1>
                  </label>
                  <input
                    className="hidden"
                    type="radio"
                    name="transport"
                    id="train"
                    value="train"
                    onClick={(e) =>
                      setTrip({ ...trip, transport: e.target.value })
                    }
                  />
                  <label
                    className={`border-2 px-3 py-2 text-sm rounded ${
                      trip.transport === "train"
                        ? "border-black font-semibold"
                        : ""
                    }`}
                    for="train"
                  >
                    <h1 className="text-gray-800">Train</h1>
                  </label>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-gray-400 mb-2">Company</h1>
                <div className="flex gap-3">
                  <input
                    className="hidden"
                    type="radio"
                    name="company"
                    id="solo"
                    value="solo"
                    onClick={(e) =>
                      setTrip({ ...trip, company: e.target.value })
                    }
                  />
                  <label
                    className={`border-2 px-3 py-2 text-sm rounded ${
                      trip.company === "solo"
                        ? "border-black font-semibold"
                        : ""
                    }`}
                    for="solo"
                  >
                    <h1 className="text-gray-800">Solo</h1>
                  </label>
                  <input
                    className="hidden"
                    type="radio"
                    name="company"
                    id="family"
                    value="family"
                    onClick={(e) =>
                      setTrip({ ...trip, company: e.target.value })
                    }
                  />
                  <label
                    className={`border-2 px-3 py-2 text-sm rounded ${
                      trip.company === "family"
                        ? "border-black font-semibold"
                        : ""
                    }`}
                    for="family"
                  >
                    <h1 className="text-gray-800">Family</h1>
                  </label>
                  <input
                    className="hidden"
                    type="radio"
                    name="company"
                    id="friends"
                    value="friends"
                    onClick={(e) =>
                      setTrip({ ...trip, company: e.target.value })
                    }
                  />
                  <label
                    className={`border-2 px-3 py-2 text-sm rounded ${
                      trip.company === "friends"
                        ? "border-black font-semibold"
                        : ""
                    }`}
                    for="friends"
                  >
                    <h1 className="text-gray-800">Friends</h1>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex-1 mt-4">
              <h1 className="text-gray-400 mb-2">Trip type</h1>
              <div className="flex gap-3">
                <input
                  className="hidden"
                  type="radio"
                  name="trip_type"
                  id="family_trip"
                  value="family"
                  onClick={(e) =>
                    setTrip({ ...trip, trip_type: e.target.value })
                  }
                />
                <label
                  className={`border-2 px-3 py-2 text-sm rounded ${
                    trip.trip_type === "family"
                      ? "border-black font-semibold"
                      : ""
                  }`}
                  for="family_trip"
                >
                  <h1 className="text-gray-800">Family</h1>
                </label>
                <input
                  className="hidden"
                  type="radio"
                  name="trip_type"
                  id="backpacking"
                  value="backpacking"
                  onClick={(e) =>
                    setTrip({ ...trip, trip_type: e.target.value })
                  }
                />
                <label
                  className={`border-2 px-3 py-2 text-sm rounded ${
                    trip.trip_type === "backpacking"
                      ? "border-black font-semibold"
                      : ""
                  }`}
                  for="backpacking"
                >
                  <h1 className="text-gray-800">Backpacking</h1>
                </label>
                <input
                  className="hidden"
                  type="radio"
                  name="trip_type"
                  id="event"
                  value="event"
                  onClick={(e) =>
                    setTrip({ ...trip, trip_type: e.target.value })
                  }
                />
                <label
                  className={`border-2 px-3 py-2 text-sm rounded ${
                    trip.trip_type === "event"
                      ? "border-black font-semibold"
                      : ""
                  }`}
                  for="event"
                >
                  <h1 className="text-gray-800">Event</h1>
                </label>
                <input
                  className="hidden"
                  type="radio"
                  name="trip_type"
                  id="adventure"
                  value="adventure"
                  onClick={(e) =>
                    setTrip({ ...trip, trip_type: e.target.value })
                  }
                />
                <label
                  className={`border-2 px-3 py-2 text-sm rounded ${
                    trip.trip_type === "adventure"
                      ? "border-black font-semibold"
                      : ""
                  }`}
                  for="adventure"
                >
                  <h1 className="text-gray-800">Adventure</h1>
                </label>
                <input
                  className="hidden"
                  type="radio"
                  name="trip_type"
                  id="business"
                  value="business"
                  onClick={(e) =>
                    setTrip({ ...trip, trip_type: e.target.value })
                  }
                />
                <label
                  className={`border-2 px-3 py-2 text-sm rounded ${
                    trip.trip_type === "business"
                      ? "border-black font-semibold"
                      : ""
                  }`}
                  for="business"
                >
                  <h1 className="text-gray-800">Business</h1>
                </label>
              </div>
            </div>
            <div className="flex mt-6 justify-between">
              <button
                onClick={(e) => submitTrip()}
                className="flex items-center gap-2 bg-emerald-500 text-white font-semibold uppercase rounded-full px-6 py-2"
              >
                Submit
              </button>
              <button
                onClick={() => setTripOpen(false)}
                className="flex items-center gap-2 bg-red-500 text-white font-semibold uppercase rounded-full px-6 py-2"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* <div className="px-36 py-8 bg-gradient-to-r from-cyan-400 to-blue-800">
        <h1 className="text-2xl text-gray-600 font-bold">Profile</h1>
        <div className="flex justify-between bg-white rounded-lg shadow-lg p-6 mt-4">
          <div className="">
            <h1 className="text-xl font-bold">{profile?.name}</h1>
            <h1 className="text-gray-400">Email: {profile?.email}</h1>
            <h1 className="text-gray-400">Phone: {profile?.phone_no}</h1>
            {profile?.website_link && (
              <a
                className="text-blue-400"
                href={profile?.website_link}
                target="_blank"
              >
                View Website
              </a>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setEdit(true)}
              className="text-white uppercase rounded-full px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600"
            >
              Edit Profile
            </button>
            <button
              onClick={() => logout()}
              className="bg-red-500 text-white px-4 py-2 rounded-full"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="px-36 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-gray-600 font-bold">Your Packages</h1>
          <button
            onClick={() => setAddPackage(true)}
            className="bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600 text-white px-4 py-2 rounded-full"
          >
            + Add Package
          </button>
        </div>
        <div className="grid grid-cols-3 gap-8 mt-6">
          {packages.length > 0 &&
            packages.map((item) => (
              <Card data={item} setPackages={setPackages} />
            ))}
        </div>
      </div>
      <Modal
        isOpen={addPackage}
        onRequestClose={() => setAddPackage(false)}
        className="w-screen h-screen flex items-center justify-center"
      >
        <div className="w-1/2 px-8 py-8 bg-white rounded border flex flex-col">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl text-gray-600 font-semibold">
              Add Package
            </h1>
            <div onClick={() => setAddPackage(false)} className="cursor-pointer">
              <h1 className="text-xl">x</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="">
              <h1 className="text-gray-800 font-semibold mb-3">Enter Name</h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                placeholder="Treking in Nepal"
                value={packageData.name}
                onChange={(e) =>
                  setPackageData({ ...packageData, name: e.target.value })
                }
              />
            </div>
            <div className="">
              <h1 className="text-gray-800 font-semibold mb-3">Enter Price</h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                placeholder="1000"
                value={packageData.price}
                onChange={(e) =>
                  setPackageData({ ...packageData, price: e.target.value })
                }
              />
            </div>
            <div className="">
              <h1 className="text-gray-800 font-semibold mb-3">
                Enter Location
              </h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                placeholder="Nepal"
                value={packageData.location}
                onChange={(e) =>
                  setPackageData({ ...packageData, location: e.target.value })
                }
              />
            </div>
            <div className="">
              <h1 className="text-gray-800 font-semibold mb-3">Enter Image</h1>
              <input
                type="file"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                onChange={(e) =>
                  setPackageData({ ...packageData, image: e.target.files[0] })
                }
              />
            </div>
            <div className="col-span-2">
              <h1 className="text-gray-800 font-semibold mb-3">
                Enter Description
              </h1>
              <textarea
                rows={4}
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                placeholder=""
                value={packageData.description}
                onChange={(e) =>
                  setPackageData({
                    ...packageData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <button
              onClick={() => paymentHandler()}
              className="col-span-2 focus:outline-none px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600 text-white rounded-lg text-sm font-semibold"
            >
              Add
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={edit}
        onRequestClose={() => setEdit(false)}
        className="w-screen h-screen flex items-center justify-center"
      >
        <div className="w-1/2 px-8 py-8 bg-white rounded border flex flex-col">
          <h1 className="text-3xl text-gray-600 font-semibold">Edit Profile</h1>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="">
              <h1 className="text-gray-800 font-semibold mb-3">Enter Name</h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                placeholder="Mihir Shinde"
                value={profile?.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>
            <div className="">
              <h1 className="text-gray-800 font-semibold mb-3">Enter Email</h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                placeholder="abc@gmail.com"
                value={profile?.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
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
                value={profile?.phone_no}
                onChange={(e) =>
                  setProfile({ ...profile, phone_no: e.target.value })
                }
              />
            </div>
            <div className="">
              <h1 className="text-gray-800 font-semibold mb-3">
                Enter Website Link
              </h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-500 font-semibold"
                placeholder="1234567890"
                value={profile?.website_link}
                onChange={(e) =>
                  setProfile({ ...profile, website_link: e.target.value })
                }
              />
            </div>
            <button
              onClick={() => editHandler()}
              className="col-span-2 focus:outline-none px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600 text-white rounded-lg text-sm font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal> */}

      {/* <Friends /> */}
    </div>
  );
};

export default Profile;
