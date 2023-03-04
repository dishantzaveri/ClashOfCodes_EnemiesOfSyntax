import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import DatePicker from "react-datepicker";
import { CiWifiOn } from "react-icons/ci";
import Maps from "./Maps";

const Tile = ({ data, setConveniences }) => {
  const [selected, setSelected] = useState(false);
  const select = () => {
    if (selected) {
      setConveniences((prev) => prev.filter((item) => item !== data));
      setSelected(!selected);
    } else {
      setConveniences((prev) => [...prev, data]);
      setSelected(!selected);
    }
  };
  return (
    <div
      onClick={() => select()}
      className={`flex px-4 py-2 gap-2 rounded outline shadow bg-emerald-100 ${
        selected ? "outline-2" : "outline-0"
      }`}
    >
      <CiWifiOn className="text-xl" />
      <h1 className="">{data}</h1>
    </div>
  );
};

const Counter = () => {
  const [count, setCount] = useState(1);
  return (
    <div className="flex w-full gap-2">
      <button className="text-xl bg-emerald-100 px-4 py-2 rounded-xl shadow" onClick={() => setCount(count - 1)}>
        -
      </button>
      <input className="w-full bg-emerald-100 text-center px-4 py-2 rounded-xl shadow focus:outline-none" type="number" min={1} value={count} onChange={e => setCount(parseInt(e.target.value))} />
      <button className="text-xl bg-emerald-100 px-4 py-2 rounded-xl shadow" onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
};

const Itinerary = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [conveniences, setConveniences] = useState([]);
  return (
    <div className="min-h-screen bg-gradient-to-t from-white to-emerald-200">
      <Navbar />
      <div className="flex w-full px-24 gap-4">
        <div className="w-1/3">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Filters</h1>
            <h1 className="text-emerald-500">Reset</h1>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <h1 className="text-lg font-semibold">Price</h1>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="px-4 py-3 bg-emerald-100 shadow text-sm text-gray-500 rounded-xl focus:outline-none"
                placeholder="From"
                type="text"
              />
              <input
                className="px-4 py-3 bg-emerald-100 shadow text-sm text-gray-500 rounded-xl focus:outline-none"
                placeholder="To"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <h1 className="text-lg font-semibold">Date</h1>
            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                className="px-4 py-3 bg-emerald-100 shadow text-sm text-gray-500 rounded-xl focus:outline-none w-full"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <DatePicker
                className="px-4 py-3 bg-emerald-100 shadow text-sm text-gray-500 rounded-xl focus:outline-none w-full"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <h1 className="text-lg font-semibold">Property Type</h1>
            <select className="px-4 py-3 bg-emerald-100 shadow text-sm text-gray-500 rounded-xl focus:outline-none w-full">
              <option>Penthouse</option>
              <option>Single room</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <h1 className="text-lg font-semibold">Conveniences</h1>
            <div className="flex flex-wrap gap-2">
              <Tile data="WiFi" setConveniences={setConveniences} />
              <Tile data="WiFi" setConveniences={setConveniences} />
              <Tile data="WiFi" setConveniences={setConveniences} />
              <Tile data="WiFi" setConveniences={setConveniences} />
              <Tile data="WiFi" setConveniences={setConveniences} />
              <Tile data="WiFi" setConveniences={setConveniences} />
              <Tile data="WiFi" setConveniences={setConveniences} />
              <Tile data="WiFi" setConveniences={setConveniences} />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <h1 className="text-lg font-semibold">Number of guests</h1>
            <div className="flex flex-wrap gap-2">
              <Counter />
            </div>
          </div>
          <button
            className="w-full bg-gray-900 text-emerald-100 text-center px-4 py-2 mt-4 rounded-xl shadow-lg"
          >
            Apply
          </button>
        </div>
        <div className="w-2/3">
          <Maps />
          <div className="">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
