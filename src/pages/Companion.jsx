import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { toast, ToastContainer } from 'react-toastify'

const Card = ({companion}) => {
  const [add, setAdd] = useState(false)
  const addFriend = () => {
    setAdd(true)
    toast.success("Friend Added", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return (
    <div data-aos="zoom-in" className="border rounded-xl ">
      <div
        key={companion.id}
        className="w-full rounded-xl shadow-lg border relative bg-gray-100"
      >
        <div className="px-4 py-6">
          <h1 className="text-gray-600 text-xl font-bold mb-2">
            {companion.user}
          </h1>
          <h1 className="text-gray-400 text-sm mb-4 flex items-center gap-2">
            <HiOutlineLocationMarker className="text-lg" />{" "}
            {companion.origin_loc}
          </h1>
          <div className="border-t border-b p-3 flex justify-between items-center">
            <h1 className="text-gray-400"> From :</h1>
            <h1 className="text-gray-600 text-1xl font-semibold">
              {companion.start_date}
            </h1>
          </div>
          <div className="border-t border-b p-3 flex justify-between items-center">
            <h1 className="text-gray-400"> To :</h1>
            <h1 className="text-gray-600 text-1xl font-semibold">
              {companion.end_date}
            </h1>
          </div>
          <div className="border-t border-b p-3 flex justify-between items-center">
            <h1 className="text-gray-400"> Destination :</h1>
            <h1 className="text-gray-600 text-1xl font-semibold">
              {companion.destination}
            </h1>
          </div>
          <div className="border-t border-b p-3 flex justify-between items-center">
            <h1 className="text-gray-400"> Company :</h1>
            <h1 className="text-gray-600 text-1xl font-semibold">
              {companion.company}
            </h1>
          </div>
          <div className="border-t border-b p-3 flex justify-between items-center">
            <h1 className="text-gray-400">Trip Type :</h1>
            <h1 className="text-gray-600 text-1xl font-semibold">
              {companion.trip_type}
            </h1>
          </div>
          <div className="border-t p-3 flex justify-between items-center">
            <h1 className="text-gray-400">Transport :</h1>
            <h1 className="text-gray-600 text-1xl font-semibold">
              {companion.transport}
            </h1>
          </div>
          <button onClick={() => addFriend()} disabled={add} className='w-full py-3 text-center bg-emerald-500 rounded-xl'>{add?"Added":"Add"}</button>
        </div>
      </div>
    </div>
  );
}

const Companion = () => {
    const { id } = useParams()
    const [companions, setCompanions] = useState([])
    useEffect(() => {
      getComp()
    }, [])
    const getComp = () => {
        axios.get(`http://127.0.0.1:8000/pairing/cluster/${id}`)
        .then((res) => {
            console.log(res.data)
            setCompanions(res.data)
        }
        )
    }
  return (
    <div>
      <ToastContainer />
        <Navbar />
        <div className="py-4 px-24">
          <h1 className='text-3xl font-semibold mb-6'>Recommended Partners</h1>
          <div className='flex flex-wrap justify-evenly'>
              {companions.map((companion) => {
                  return( 
                      <Card companion={companion} />
                  )
              })}
          </div>
        </div>
    </div>
  )
}

export default Companion