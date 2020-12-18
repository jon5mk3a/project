import useFetch from '../useFetch';
import ApartmentCard from './ApartmentCard';

function Apartments() {
    const apartments = useFetch ('http://localhost:8080/api/apartments/getApartments')
    console.log(apartments);
    return(
        <div className='apartment-cards'>
            {apartments && apartments.map(apartment =>
                    <ApartmentCard key={apartment.id} apartment={apartment} />
            )}
        </div>
    );
};

export default Apartments;
