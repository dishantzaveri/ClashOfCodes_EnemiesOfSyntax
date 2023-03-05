import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import DatePicker from "react-datepicker";
import { CiWifiOn } from "react-icons/ci";
import axios from "axios"
import Maps from "./Maps";
import { Disclosure } from '@headlessui/react'
import { BsChevronDoubleDown } from "react-icons/bs"

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
      className={`flex px-4 py-2 gap-2 rounded outline shadow cursor-pointer bg-emerald-100 ${selected ? "outline-2" : "outline-0"
        }`}
    >
      {/* <CiWifiOn className="text-xl" /> */}
      <h1 className="">{data}</h1>
    </div>
  );
};

// const Counter = () => {
//   return (
//     <div className="flex w-full gap-2">
//       <button className="text-xl bg-emerald-100 px-4 py-2 rounded-xl shadow" onClick={() => setCount(count - 1)}>
//         -
//       </button>
//       <input className="w-full bg-emerald-100 text-center px-4 py-2 rounded-xl shadow focus:outline-none" type="number" min={1} value={count} onChange={e => setCount(parseInt(e.target.value))} />
//       <button className="text-xl bg-emerald-100 px-4 py-2 rounded-xl shadow" onClick={() => setCount(count + 1)}>
//         +
//       </button>
//     </div>
//   );
// };

const Itinerary = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [conveniences, setConveniences] = useState([]);
  const [mustVisit, setVisit] = useState(null);
  const [mustVisit2, setVisit2] = useState(null);
  const [count, setCount] = useState(1);
  const numbers = [...Array(count).keys()];


  const buildIt = () => {

    // all hotels
    var config = {
      method: 'get',
      url: 'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=DEL',
      headers: {
        'Authorization': 'Bearer z8K0qpIoZ8i0gA5ghRvkZPjav01P'
      },
    };
    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        setVisit2(response.data.data.slice(1, 5));
        // mustVisit2
        console.log(mustVisit2);
      })
      .catch(function (error) {
        console.log(error);
      });

    // all city
    var config2 = {
      method: 'get',
      url: 'https://test.api.amadeus.com/v1/reference-data/recommended-locations?cityCodes=PAR&travelerCountryCode=DEL',
      headers: {
        'Authorization': 'Bearer z8K0qpIoZ8i0gA5ghRvkZPjav01P'
      }
    };

    axios(config2)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setVisit(response.data);
        console.log(mustVisit.data[0].name);
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  return (
    <div className="min-h-screen bg-gradient-to-t from-white to-emerald-200">
      <Navbar />
      <div className="flex w-full px-24 p-5 gap-4">
        <div className="w-1/3">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Filters</h1>
            <button className="text-emerald-500">Reset</button>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <h1 className="text-lg font-semibold">Location</h1>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="px-4 py-3 bg-emerald-100 shadow text-sm text-gray-500 rounded-xl focus:outline-none"
                placeholder="Travel Code"
                type="text"
              />
              <input
                className="px-4 py-3 bg-emerald-100 shadow text-sm text-gray-500 rounded-xl focus:outline-none"
                placeholder="City Code"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <h1 className="text-lg font-semibold">Price</h1>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="px-4 py-3 bg-emerald-100 shadow text-sm text-gray-500 rounded-xl focus:outline-none"
                placeholder="From $"
                type="text"
              />
              <input
                className="px-4 py-3 bg-emerald-100 shadow text-sm text-gray-500 rounded-xl focus:outline-none"
                placeholder="To $"
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
            <h1 className="text-lg font-semibold">Travellers category</h1>
            <select className="px-4 py-3 bg-emerald-100 shadow text-sm text-gray-500 rounded-xl focus:outline-none w-full">
              <option>Solo</option>
              <option>Group</option>
              <option>Family</option>
              <option>Couple</option>
              <option>Elders</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <h1 className="text-lg font-semibold">Food Conveniences</h1>
            <div className="flex flex-wrap gap-2">
              <Tile data="Vegan" setConveniences={setConveniences} />
              <Tile data="Veg" setConveniences={setConveniences} />
              <Tile data="Non Veg" setConveniences={setConveniences} />
              <Tile data="Egg" setConveniences={setConveniences} />
              <Tile data="Gluten Free" setConveniences={setConveniences} />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <h1 className="text-lg font-semibold">Number of Days</h1>
            <div className="flex flex-wrap gap-2">
              <div className="flex w-full gap-2">
                <button className="text-xl bg-emerald-100 px-4 py-2 rounded-xl shadow" onClick={() => setCount(count - 1)}>
                  -
                </button>
                <input className="w-full bg-emerald-100 text-center px-4 py-2 rounded-xl shadow focus:outline-none" type="number" min={1} value={count} onChange={e => setCount(parseInt(e.target.value))} />
                <button className="text-xl bg-emerald-100 px-4 py-2 rounded-xl shadow" onClick={() => setCount(count + 1)}>
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <h1 className="text-lg font-semibold">Travel Conveniences</h1>
            <div className="flex flex-wrap gap-2">
              <Tile data="Flight" setConveniences={setConveniences} />
              <Tile data="Train" setConveniences={setConveniences} />
              <Tile data="Car" setConveniences={setConveniences} />
              <Tile data="Cab" setConveniences={setConveniences} />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <h1 className="text-lg font-semibold">Travel Preferences</h1>
            <div className="flex flex-wrap gap-2">
              <Tile data="Adventure" setConveniences={setConveniences} />
              <Tile data="Camping" setConveniences={setConveniences} />
              <Tile data="Relaxing" setConveniences={setConveniences} />
              <Tile data="Shopping" setConveniences={setConveniences} />
              <Tile data="Treking" setConveniences={setConveniences} />
              <Tile data="Religious" setConveniences={setConveniences} />
            </div>
          </div>
          <button
            className="w-full bg-gray-900 text-emerald-100 text-center px-4 py-2 mt-4 rounded-xl shadow-lg"
            onClick={buildIt}
          >
            Apply
          </button>
        </div>
        <div className="w-2/3">
          <Maps />

          <div className="">

          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 mx-auto">
          <h2 className="text-2xl font-medium text-gray-800 mb-4">Travel Itinerary</h2>
          {numbers.map((i) => {
            return <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex mb-4 w-full justify-between rounded-lg bg-emerald-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-800">Day {i + 1}</h3>
                      <p className="text-gray-600">{
                        mustVisit != null &&
                        mustVisit.data[i].name}</p>
                    </div>
                    <BsChevronDoubleDown />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    <h4>Hotels: </h4>
                    {
                      mustVisit2 != null &&
                      mustVisit2.map((k) => {
                        return k.name
                      })
                    }
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          })}
        </div>
      </div>
    </div >
  );
};

export default Itinerary;
