import { useState } from 'react'
import './Carousel.css';


function Carousel() {

  const apartments = useFetch ('http://localhost:8080/api/apartments/getApartments')

  const [page, setPage] = useState(0)
  const setPageOffset = n => setPage((page + n) % Math.ceil(cards.length / 3))

  const apartment = apartments[page]

  return (
    <div className="carousel">
      <div className="slides">
          <div className="card">
            <img src={apartment.photo} />
          </div>
      </div>
      <div className="arrows">
          <div className="arrow-left" onClick={() => setPageOffset(-1)}>&lt;</div>
          <div className="arrow-right" onClick={() => setPageOffset(1)}>&gt;</div>
      </div>
    </div>
  );
}

export default Carousel;
