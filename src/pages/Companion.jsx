import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

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
        <Navbar />
    </div>
  )
}

export default Companion