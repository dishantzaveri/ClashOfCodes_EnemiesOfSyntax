import React from 'react'

const ItineraryPdf = ({mustVisit2}) => {
  return (
    mustVisit2 && <div>
    Day 1:
    <h1>{mustVisit2[0]?.name}</h1>
    Arrive in Delhi by train in the morning and check in at your hotel.
    Have breakfast at Karim's in Old Delhi, which is known for its delicious non-veg food.
    Visit Red Fort, which is a UNESCO World Heritage Site and an iconic landmark of Delhi.
    In the evening, go on a food tour of Delhi and try out some of the famous non-veg street food like kebabs, tikkas, and biryanis.
    Day 2:
    <h1>{mustVisit2[1]?.name}</h1>
    Start your day with a visit to Humayun's Tomb, another UNESCO World Heritage Site and a beautiful example of Mughal architecture.
    Head to Hauz Khas Village, a trendy neighborhood with a variety of cafes, restaurants, and boutiques. You can have lunch at Yeti, which serves delicious Nepali cuisine and has a beautiful rooftop view.
    In the evening, go on a heritage walk in the streets of Old Delhi and explore the narrow alleys and markets. You can also take a rickshaw ride through the bustling streets and experience the chaos and vibrancy of the city.
    Day 3:
    <h1>{mustVisit2[2]?.name}</h1>
    Take a day trip to the Neemrana Fort Palace, which is located about 2 hours from Delhi by train. This 15th-century fort has been converted into a heritage hotel and is a popular weekend getaway from Delhi. You can enjoy a buffet lunch at the palace and indulge in some adventure activities like ziplining, flying fox, and camel rides.
    Return to Delhi in the evening and have dinner at Moti Mahal Delux, a famous restaurant chain known for its butter chicken and other non-veg delicacies.</div>
  )
}

export default ItineraryPdf