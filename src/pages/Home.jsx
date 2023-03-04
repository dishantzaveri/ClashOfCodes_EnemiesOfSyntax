import React, { Fragment, useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundVideo from "../assets/videos/background.mp4";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbClipboardList } from "react-icons/tb";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { MapContainer, Marker, TileLayer, Popup, FeatureGroup, withLeaflet } from "react-leaflet"

import { FaMountain } from "react-icons/fa"
import { events } from "./eventData"
import { CometChat } from "@cometchat-pro/chat";
import Swal from "sweetalert2";
import { Dialog, Transition } from '@headlessui/react'
import L from "leaflet"
import mark from "../assets/images/markers.png"
import { useTranslation } from 'react-i18next'



const Card = ({ data }) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false)
  const [center, setCenter] = useState({
    lat: 13.084,
    lng: 80.24
  });

  const markerIcon = new L.Icon({
    iconUrl: mark,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [3, -46]

  })


  const cancelButtonRef = useRef(null)

  return (
    <div key={data.id} className="w-full rounded-xl shadow-lg border relative">
      <img
        className="rounded-t-xl h-[35vh] w-full"
        src={data.venue.image_url}
        alt=""
      />
      <div className="px-4 py-6">
        <h1 className="text-gray-600 text-xl font-bold mb-2">
          {t(data.name)}
        </h1>
        <h1 className="text-gray-400 text-sm mb-4 flex items-center gap-2">
          <HiOutlineLocationMarker className="text-lg" /> {data.venue.location}
        </h1>
        <div className="border-t border-b p-3 flex justify-between items-center">
          <h1 className="text-gray-400"> Date :</h1>
          <h1 className="text-gray-600 text-2xl font-bold">{data.date}</h1>
        </div>
        <h1 className="text-sm text-gray-600 py-4">Rate : {data.trending_score}/10</h1>
        <button onClick={() => setOpen(true)} className="flex items-center gap-2 text-white font-semibold uppercase rounded-full px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600">
          Location <TbClipboardList />
        </button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" style={{ width: "700px" }}>
                  <MapContainer center={center} zoom="12">
                    <TileLayer url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=3DHOohQB1Ufdr3SDSGbf" ></TileLayer>
                    <Marker
                      position={[data.venue.latitude, data.venue.longitude]} icon={markerIcon} key={data.name}>
                    </Marker>
                  </MapContainer>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [packages, setPackages] = useState([])
  const user = JSON.parse(localStorage.getItem("user"));
  const { t } = useTranslation();

  const [theme, setTheme] = useState("purple")
  useEffect(() => {
    CometChat.getLoggedinUser().then(
      (user) => {
        console.log("user details:", { user });
      },
      (error) => {
        console.log("error getting details:", { error });
      }
    );

    let usersRequest = new CometChat.UsersRequestBuilder().setLimit(30).build();
    usersRequest.fetchNext().then((userList) => {
      console.log(userList);
    });
  }, []);
  useEffect(() => {
    if (user) getPackages();
  }, []);
  const getPackages = () => {
    var config = {
      method: "get",
      url: "http://vismayvora.pythonanywhere.com/tourist_app/tourpackage",
      headers: {
        Authorization: "Token " + user.token,
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
    <div className={`w-full h-full relative bg-gradient-to-t from-white
     ${theme == 'emerald' ? "to-emerald-200" : theme == 'amber' ? "to-amber-200" : theme == 'sky' ? "to-sky-200" : "to-purple-200"} `}>
      {/* <video autoPlay loop muted className="absolute -z-10 w-full h-auto">
        <source src={backgroundVideo} type="video/mp4" />
      </video> */}
      <Navbar color={theme} />
      <div data-aos="zoom-in-up" className="flex flex-col items-center py-24 px-60 gap-6">
        <h1 className="text-6xl text-gray-800 font-bold text-center leading-snug">
          {t("heading_main")}
        </h1>
        <h1 className="text-xl text-gray-500 font-medium text-center leading-normal">
          {t("Join our community of adventurous singles and start your next journey together!")}
        </h1>
        <Link to="/register" className="">
          <button className={`text-gray-100 text-lg px-10 py-6  ${theme == 'emerald' ? "bg-emerald-500" : theme == 'amber' ? "bg-amber-500" : theme == 'sky' ? "bg-sky-500" : "bg-purple-500"} rounded-full`}>
            {t("getstarted")}
          </button>
        </Link>
        <h2 className="mt-36 font-bold text-3xl p-5">Select your theme : </h2>
        <div className="grid grid-cols-3 gap-20">
          <button data-aos="zoom-in-up" onClick={() => setTheme("emerald")} className="w-48 h-48 shadow-lg p-12 rounded-full bg-emerald-100 text-xl font-semibold "><img src="https://cdn-icons-png.flaticon.com/512/1020/1020719.png" alt="moun" /> Mountain </button>
          <button data-aos="zoom-in-up" onClick={() => setTheme("sky")} className=" w-48 h-48 shadow-lg p-12 rounded-full bg-sky-100 text-xl font-semibold "><img src="https://cdn-icons-png.flaticon.com/512/3126/3126507.png" className="w-44" alt="moun" /> Beaches </button>
          <button data-aos="zoom-in-up" onClick={() => setTheme("amber")} className="w-48 h-48 shadow-lg p-12 rounded-full bg-amber-100 text-lg font-semibold "><img src="https://cdn-icons-png.flaticon.com/512/3654/3654925.png" className="w-44" alt="moun" />Monuments </button>
        </div>
      </div>
      <div className="h-[80vh]">
        <div className="w-full h-full px-36 py-48 ">
          <h1 className="text-black uppercase mb-2">Upcoming events</h1>
          <h1 className="text-black text-4xl font-bold mb-12">
            Search your{" "}
            <span className="underline decoration-cyan-500 underline-offset-4">
              Holiday
            </span>
          </h1>
          <div className="relative grid grid-cols-3 bg-black w-full rounded-xl p-8 gap-8">
            <div className="">
              <h1 className="text-gray-400 font-semibold mb-3">
                Search your destination:
              </h1>
              <input
                type="text"
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-full text-sm text-gray-500 font-semibold"
              />
            </div>
            <div className="">
              <h1 className="text-gray-400 font-semibold mb-3">
                Search your date:
              </h1>
              <DatePicker
                className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-full text-sm text-gray-500 font-semibold"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            {/* <button className="absolute -bottom-5 left-[45%] text-white uppercase rounded-full px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-800 hover:to-cyan-600">
              More filters
            </button> */}
          </div>
        </div>
      </div>
      {/* <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          <button onClick={() => setIsOpen(false)}>Deactivate</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog> */}
      <div className="w-full h-full px-36 py-24 bg-gray-50">
        <h1 className="text-gray-600 text-2xl font-bold mb-12">
          Most Trending{" "}
          <span className="underline decoration-cyan-500">destinations</span>
        </h1>
        <div className="grid grid-cols-3 gap-8">
          {events.length > 0 && events.map((item) => <Card data={item} />)}
        </div>
      </div>

    </div >
  );
};

export default Home;
