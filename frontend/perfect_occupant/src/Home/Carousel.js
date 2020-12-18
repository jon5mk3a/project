import { useState } from 'react'
import './Carousel.css';

const cards = [
  'Usa las flechas',
  'para avanzar',
  'las cartas',
  'Hay tres pantallas',
  'después',
  'se repiten',
  'Ya se termina',
  'este ejemplo',
  'Saludos!'
]

function Carousel() {

  const [page, setPage] = useState(0)
  const setPageOffset = n => setPage((page + n) % Math.ceil(cards.length / 3))

  return (
    <div className="carousel">
      <div className="slides">
        {cards.slice(page * 3, page * 3 + 3).map((card, i) =>
          <div key={i} className="card">
            <span>{card}</span>
          </div>
        )}
      </div>
      <div className="arrows">
          <div className="arrow-left" onClick={() => setPageOffset(-1)}>&lt;</div>
          <div className="arrow-right" onClick={() => setPageOffset(1)}>&gt;</div>
      </div>
    </div>
  );
}

export default Carousel;
