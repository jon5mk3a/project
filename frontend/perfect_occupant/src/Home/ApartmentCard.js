function ApartmentCard({ apartment }) {
    return (
        <div className='apartment-card'>
            <div className='photo'>
                <img src={apartment.photo} />
            </div>
            <div className='location'>
                <h1>Apartment in {apartment.location}</h1>
            </div>
            <div className='rooms-bathrooms'>
                with {apartment.rooms} rooms and {apartment.bathroom} bathrooms
            </div>
            <div className='lift'>
                Lift: {apartment.lift ? 'yes' : 'no'}
            </div>
            <div className='balcony'>
                Balcony: {apartment.balcony ? 'yes' : 'no'}
            </div>
            <div className='heating'>
                Heating: {apartment.heating ? 'yes' : 'no'}
            </div>
            <div className='furniture'>
                Furniture: {apartment.furniture ? 'yes' : 'no'}
            </div>
            <div className='internet'>
                Internet: {apartment.internet ? 'yes' : 'no'}
            </div>
            <div className='tv'>
                Tv: {apartment.tv ? 'yes' : 'no'}
            </div>
            <div className='price'>
                Price: {apartment.price} €
            </div>
        </div>
    );
};

export default ApartmentCard;
