import React from 'react';
import { Fragment } from 'react';
import { useEffect, useState, useRef } from 'react';
import { events } from "./eventData";
import DatePicker from "react-datepicker";
import { HiOutlineLocationMarker } from "react-icons/hi";

import {
    MapContainer,
    Marker,
    TileLayer,
    Popup,
    FeatureGroup,
    withLeaflet,
} from "react-leaflet";

import { BiMapPin, BiMap } from "react-icons/bi";
import { CometChat } from "@cometchat-pro/chat";
import { Dialog, Transition } from "@headlessui/react";
import L from "leaflet";
import mark from "../assets/images/markers.png";
import { useTranslation } from "react-i18next";
import { Navbar } from '../components/Navbar';
// import MyCalendar from './Calendar';
import Demo from './Calendar2';


const Card = ({ data, theme }) => {
    const { t } = useTranslation();
    const [openMap, setOpenMap] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [center, setCenter] = useState({
        lat: 13.084,
        lng: 80.24,
    });

    const markerIcon = new L.Icon({
        iconUrl: mark,
        iconSize: [35, 45],
        iconAnchor: [17, 46],
        popupAnchor: [3, -46],
    });

    const cancelButtonRef = useRef(null);

    return (
        <div
            key={data.id}
            className="w-full rounded-xl shadow-lg border relative bg-gray-100"
        >
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
                <h1 className="text-sm text-gray-600 py-4">
                    Rate : {data.trending_score}/10
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
                                <Dialog.Panel
                                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                                    style={{ width: "700px" }}
                                >
                                    <MapContainer center={center} zoom="12">
                                        <TileLayer url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=3DHOohQB1Ufdr3SDSGbf"></TileLayer>
                                        <Marker
                                            position={[data.venue.latitude, data.venue.longitude]}
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
        </div>
    );
};

const Events = () => {
    const [destination, setDestination] = useState("");
    const [filteredList, setFilteredList] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [packages, setPackages] = useState([])
    var theme = localStorage.getItem("color")
    useEffect(() => {
        let filtered = events.filter((item) =>
            item.venue.location.toLowerCase().includes(destination.toLowerCase())
        );
        setFilteredList(filtered);
    }, [destination]);
    return (
        <>
            <Navbar color={theme} />
            <div className='px-24 py-8'>
                <div className="">
                    <div className="w-full h-full py-24">
                        <h1 className="text-black uppercase mb-2">Upcoming events</h1>
                        <h1 className="text-black text-4xl font-bold mb-12">
                            Search your{" "}
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
                                Holiday
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
                                    Search your destination:
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
                <div className="w-full h-full mb-12">
                    <h1 className="text-gray-600 text-2xl font-bold mb-12">
                        Most Trending{" "}
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
                            destinations
                        </span>
                    </h1>
                    <div className="grid grid-cols-3 gap-8">
                        {filteredList !== []
                            ? filteredList.length > 0 &&
                            filteredList.map((item) => <Card data={item} theme={theme} />)
                            : events.length > 0 &&
                            events.map((item) => <Card data={item} theme={theme} />)}
                    </div>
                </div>

                {/* <MyCalendar /> */}
                <h1 className='p-8 text-2xl  self-center'>Schedule</h1>
                <Demo />
            </div>
        </>
    )
}

export default Events