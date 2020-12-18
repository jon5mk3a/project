function ApartmentCard({ apartment }) {
    return (
        <div>
            <div>
                {apartment.photo}
            </div>
            <div>
                Apartment in {apartment.location}
            </div>
            <div>
                with {apartment.rooms} rooms and {apartment.bathroom} bathrooms
            </div>
            <div>
                Lift: {apartment.lift ? 'yes' : 'no'}
            </div>
            <div>
                Balcony: {apartment.balcony ? 'yes' : 'no'}
            </div>
            <div>
                Heating: {apartment.heating ? 'yes' : 'no'}
            </div>
            <div>
                Furniture: {apartment.furniture ? 'yes' : 'no'}
            </div>
            <div>
                Internet: {apartment.internet ? 'yes' : 'no'}
            </div>
            <div>
                Tv: {apartment.tv ? 'yes' : 'no'}
            </div>
            <div>
                Price: {apartment.price} €
            </div>
        </div>
    )
}

export default ApartmentCard;
