import React, { Fragment, useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import mountain from "../assets/videos/mountain.mp4";
import monuments from "../assets/videos/monuments.mp4";
import beach from "../assets/videos/beach.mp4";
import temple from "../assets/videos/temple.mp4";
import event from "../assets/videos/events.mp4";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { beaches, temples } from "./PreferenceData"
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  FeatureGroup,
  withLeaflet,
} from "react-leaflet";

import { BiMapPin, BiMap } from "react-icons/bi";
import { events } from "./eventData";
import { CometChat } from "@cometchat-pro/chat";
import { Dialog, Transition } from "@headlessui/react";
import L from "leaflet";
import mark from "../assets/images/markers.png";
import { useTranslation } from "react-i18next";
import Footer from "./FooterHome";

const Card = ({ data, theme }) => {
  const { t } = useTranslation();
  const [openMap, setOpenMap] = useState(false);
  const [openView, setOpenView] = useState(false);
  

  const markerIcon = new L.Icon({
    iconUrl: mark,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [3, -46],
  });

  const cancelButtonRef = useRef(null);
  const [center, setCenter] = useState({
    lat: 13.084,
    lng: 80.24
  });
  return (
    <div
      key={data.id}
      className="w-full rounded-xl shadow-lg border relative bg-gray-100"
    >
      <img
        className="rounded-t-xl h-[35vh] w-full"
        src={data.image_url}
        alt=""
      />
      <div className="px-4 py-6">
        <h1 className="text-gray-600 text-xl font-bold mb-2">{t(data.name)}</h1>
        <h1 className="text-gray-400 text-sm mb-4 flex items-center gap-2">
          <HiOutlineLocationMarker className="text-lg" /> {t(data.location)}
        </h1>
        {/* <div className="border-t border-b p-3 flex justify-between items-center">
          <h1 className="text-gray-400"> Date :</h1>
          <h1 className="text-gray-600 text-2xl font-bold">{data.date}</h1>
        </div> */}
        <h1 className="text-sm text-gray-600 py-4">
          Rate : {parseInt(Math.abs(data.latitude % 10))}/10
        </h1>
        <div className="flex justify-between">
          <button
            onClick={() => setOpenMap(true)}
            className={`flex items-center gap-2 text-white font-semibold uppercase rounded-full px-6 py-2 ${theme == "emerald"
              ? "bg-emerald-500"
              : theme == "amber"
                ? "bg-amber-500"
                : theme == "sky"
                  ? "bg-sky-500"
                  : theme == "red"
                    ? "bg-red-500"
                    : theme == "violet"
                      ? "bg-violet-500"
                      : "bg-purple-500"
              }`}
          >
            Location <BiMap />
          </button>
          <button
            onClick={() => setOpenView(true)}
            className={`flex items-center gap-2 text-white font-semibold uppercase rounded-full px-6 py-2 ${
              theme == "emerald"
                ? "bg-emerald-500"
                : theme == "amber"
                ? "bg-amber-500"
                : theme == "sky"
                  ? "bg-sky-500"
                  : theme == "red"
                    ? "bg-red-500"
                    : theme == "violet"
                      ? "bg-violet-500"
                      : "bg-purple-500"
              }`}
          >
            <BiMapPin /> View
          </button>
        </div>
      </div>
      <Transition.Root show={openMap} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenMap}
        >
          <div className="fixed inset-0 z-10">
            <div className="flex min-h-screen min-w-screen items-end justify-center text-center sm:items-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[70vw]">
                  <MapContainer
                    center={center}
                    zoom="8"
                  >
                    <TileLayer url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=3DHOohQB1Ufdr3SDSGbf"></TileLayer>
                    <Marker
                      position={[data.latitude, data.longitude]}
                      icon={markerIcon}
                      key={data.name}
                    ></Marker>
                  </MapContainer>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpenMap(false)}
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
      <Transition.Root show={openView} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenView}
        >
          <div className="fixed inset-0 z-10">
            <div className="flex min-h-screen min-w-screen items-end justify-center text-center sm:items-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[60vw]">
                  <iframe width="900" height="450" src="https://www.airpano.com/embed.php?3D=polar-urals" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" framespacing="0" allowfullscreen> </iframe>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

const Background = ({ backgroundVideo, theme }) => {
  return (
    <video autoPlay loop muted className={`absolute -z-10 w-full h-auto`}>
      <source src={backgroundVideo} type="video/mp4" />
    </video>
  );
};

const Home = () => {
  const [destination, setDestination] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [filteredList2, setFilteredList2] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [packages, setPackages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const { t } = useTranslation();

  const [theme, setTheme] = useState("emerald");
  useEffect(() => {
    localStorage.setItem("color", theme);
  }, [theme])
  
  localStorage.setItem("color",theme);
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
    let filtered = beaches.filter((item) =>
      item.location.toLowerCase().includes(destination.toLowerCase())
    );
    setFilteredList(filtered);
  }, [destination]);

  useEffect(() => {
    let filtered = temples.filter((item) =>
      item.location.toLowerCase().includes(destination.toLowerCase())
    );
    setFilteredList2(filtered);
  }, [destination]);
  return (
    <div className={`w-full h-full relative `}>
      {/* {theme == "amber" ? (
        <Background backgroundVideo={monuments} theme={theme} />
      ) : theme == "sky" ? (
        <Background backgroundVideo={beach} theme={theme} />
      ) : theme == "red" ? (
        <Background backgroundVideo={temple} theme={theme} />
      ) : theme == "violet" ? (
        <Background backgroundVideo={event} theme={theme} />
      ) : (
        <Background backgroundVideo={mountain} theme={theme} />
      )} */}
      <video
        autoPlay
        loop
        muted
        className={`absolute -z-10 w-full h-auto ${theme !== "amber" ? "hidden" : "block"
          }`}
      >
        <source src={monuments} type="video/mp4" />
      </video>
      <video
        autoPlay
        loop
        muted
        className={`absolute -z-10 w-full h-auto ${theme !== "sky" ? "hidden" : "block"
          }`}
      >
        <source src={beach} type="video/mp4" />
      </video>
      <video
        autoPlay
        loop
        muted
        className={`absolute -z-10 w-full h-auto ${theme !== "violet" ? "hidden" : "block"
          }`}
      >
        <source src={event} type="video/mp4" />
      </video>
      <video
        autoPlay
        loop
        muted
        className={`absolute -z-10 w-full h-auto ${theme !== "red" ? "hidden" : "block"
          }`}
      >
        <source src={temple} type="video/mp4" />
      </video>
      <video
        autoPlay
        loop
        muted
        className={`absolute -z-10 w-full h-auto ${theme !== "emerald" ? "hidden" : "block"
          }`}
      >
        <source src={mountain} type="video/mp4" />
      </video>
      <div className="bg-gray-800/40 h-screen">
        <div className="text-gray-100">
          <Navbar color={theme} />
        </div>
        {/* <iframe width="700" height="450" src="https://www.airpano.com/embed.php?3D=polar-urals" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" framespacing="0" allowfullscreen> </iframe> */}
        <div
          data-aos="zoom-in-up"
          className="flex flex-col items-center py-36 px-60 gap-6 h-full"
        >
          <h1 className="text-6xl text-gray-100 font-bold text-center leading-snug">
            {t("Explore the world with your perfect travel companion")}
          </h1>
          <h1 className="text-xl text-gray-300 font-medium text-center leading-normal">
            {t("Join our community of adventurous singles and start your next journey together!")}
          </h1>
          <Link to="/register" className="">
            <button
              className={`text-gray-100 text-lg capitalize px-10 py-6 ${theme == "emerald"
                ? "bg-emerald-500"
                : theme == "amber"
                  ? "bg-amber-500"
                  : theme == "sky"
                    ? "bg-sky-500"
                    : theme == "red"
                      ? "bg-red-500"
                      : theme == "violet"
                        ? "bg-violet-500"
                        : "bg-purple-500"
                } rounded-full`}
            >
              {t("Get Started")}
            </button>
          </Link>
        </div>
      </div>
      <div
        className={` px-36 bg-gradient-to-t from-white
     ${theme == "emerald"
            ? "bg-emerald-200"
            : theme == "amber"
              ? "bg-amber-200"
              : theme == "sky"
                ? "bg-sky-200"
                : theme == "red"
                  ? "bg-red-200"
                  : theme == "violet"
                    ? "bg-violet-200"
                    : "bg-purple-200"
          }`}
      >
        <div className="flex flex-col items-center py-8">
          <h2 className="font-bold text-3xl py-8">{t("Select your theme :")} </h2>
          <div className="flex items-center justify-between gap-8 mt-4">
            <button
              data-aos="zoom-in-up"
              onClick={() => setTheme("emerald")}
              className="flex flex-col items-center justify-center w-60 h-60 shadow-lg rounded-2xl bg-emerald-100 text-xl font-semibold gap-2 focus:outline focus:shadow-emerald-700/70"
            >
              <img
                className="w-28"
                src="https://cdn-icons-png.flaticon.com/512/1020/1020719.png"
                alt="moun"
              />{" "}
              {t("Mountain")}{" "}
            </button>
            <button
              data-aos="zoom-in-up"
              onClick={() => setTheme("red")}
              className="flex flex-col items-center justify-center w-60 h-60 shadow-lg rounded-2xl bg-red-100 text-xl font-semibold gap-2 delay-150 focus:outline focus:shadow-red-700/70"
            >
              <img
                className="w-28"
                src="https://cdn-icons-png.flaticon.com/512/2465/2465330.png"
                alt="moun"
              />
              {t("Temples")}
            </button>
            <button
              data-aos="zoom-in-up"
              onClick={() => setTheme("sky")}
              className="flex flex-col items-center justify-center w-60 h-60 shadow-lg rounded-2xl bg-sky-100 text-xl font-semibold gap-2 delay-150 focus:outline focus:shadow-sky-700/70"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3126/3126507.png"
                className="w-28"
                alt="moun"
              />{" "}
              {t("Beaches")}{" "}
            </button>
            <button
              data-aos="zoom-in-up"
              onClick={() => setTheme("violet")}
              className="flex flex-col items-center justify-center w-60 h-60 shadow-lg rounded-2xl bg-violet-100 text-xl font-semibold gap-2 focus:outline focus:shadow-violet-700/70"
            >
              <img
                className="w-28"
                src="https://cdn-icons-png.flaticon.com/512/4719/4719969.png"
                alt="moun"
              />
              {t("Events")}
            </button>
            <button
              data-aos="zoom-in-up"
              onClick={() => setTheme("amber")}
              className="flex flex-col items-center justify-center w-60 h-60 shadow-lg rounded-2xl bg-amber-100 text-xl font-semibold gap-2 focus:outline focus:shadow-amber-700/70"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3654/3654925.png"
                className="w-28"
                alt="moun"
              />
              {t("Monuments")}{" "}
            </button>
          </div>
        </div>
        <div className="">
          <div className="w-full h-full py-24">
            {/* <h1 className="text-black uppercase mb-2">Upcoming events</h1> */}
            <h1 className="text-black text-4xl font-bold mb-12">
              {t("Search your")}{" "}
              <span
                className={`underline ${theme == "emerald"
                  ? "decoration-emerald-500"
                  : theme == "amber"
                    ? "decoration-amber-500"
                    : theme == "sky"
                      ? "decoration-sky-500"
                      : theme == "red"
                        ? "decoration-red-500"
                        : theme == "violet"
                          ? "decoration-violet-500"
                          : "decoration-purple-500"
                  } underline-offset-4`}
              >
                {t("Holiday")}
              </span>
            </h1>
            <div
              className={`relative grid grid-cols-3 w-full rounded-xl shadow-lg p-8 gap-8 ${theme == "emerald"
                ? "bg-emerald-200"
                : theme == "amber"
                  ? "bg-amber-200"
                  : theme == "sky"
                    ? "bg-sky-200"
                    : theme == "red"
                      ? "bg-red-200"
                      : theme == "violet"
                        ? "bg-violet-200"
                        : "bg-purple-200"
                } ${theme == "emerald"
                  ? "shadow-emerald-700/50"
                  : theme == "amber"
                    ? "shadow-amber-700/50"
                    : theme == "sky"
                      ? "shadow-sky-700/50"
                      : theme == "red"
                        ? "shadow-red-700/50"
                        : theme == "violet"
                          ? "shadow-violet-700/50"
                          : "shadow-purple-700/50"
                }`}
            >
              <div className="">
                <h1 className="text-gray-800 font-semibold mb-3">
                  {t("Search your destination:")}
                </h1>
                <input
                  type="text"
                  className="w-full focus:outline-none px-4 py-3 bg-gray-100 rounded-full text-sm text-gray-500 font-semibold"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="">
                <h1 className="text-gray-800 font-semibold mb-3">
                  {t("Search your date:")}
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
        <div className="w-full h-full mb-12">
          <h1 className="text-gray-600 text-2xl font-bold mb-12">
            {t("Most Trending")}{" "}
            <span
              className={`underline ${theme == "emerald"
                ? "decoration-emerald-500"
                : theme == "amber"
                  ? "decoration-amber-500"
                  : theme == "sky"
                    ? "decoration-sky-500"
                    : theme == "red"
                      ? "decoration-red-500"
                      : theme == "violet"
                        ? "decoration-violet-500"
                        : "decoration-purple-500"
                }`}
            >
              {t("destinations")}
            </span>
          </h1>
          {theme == 'sky' ? <div className="grid grid-cols-3 gap-8">
            {beaches !== []
              ? beaches.length > 0 &&
              beaches.map((item) => <Card data={item} theme={theme} />)
              : beaches.length > 0 &&
              beaches.map((item) => <Card data={item} theme={theme} />)}
          </div>
            :
            <div className="grid grid-cols-3 gap-8">
              {temples !== []
                ? temples.length > 0 &&
                temples.map((item) => <Card data={item} theme={theme} />)
                : temples.length > 0 &&
                temples.map((item) => <Card data={item} theme={theme} />)}
            </div>
          }

        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
