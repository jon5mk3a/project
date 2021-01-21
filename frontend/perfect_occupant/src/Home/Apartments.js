import useFetch from '../useFetch';
import ApartmentCard from './ApartmentCard';
import './Apartments.css';

function Apartments() {
    const apartments = useFetch ('http://localhost:8080/api/apartments/getApartments')
    console.log(apartments);
    return(
        <div className='apartment-background'>
            <div className='apartment-cards'>
                {apartments && apartments.map(apartment =>
                        <ApartmentCard key={apartment.id} apartment={apartment} />
                )}
            </div>
        </div>
    );
};

export default Apartments;
