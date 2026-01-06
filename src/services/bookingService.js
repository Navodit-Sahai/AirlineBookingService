const {BookingRepository}=require('../repository/index');
const axios=require('axios');
const {FLIGHT_SERVICE_PATH}=require('../config/serverConfig');
const { ServiceError } = require('../utils/errors');


class BookingService{
    constructor(){
        this.bookingRepostory=new BookingRepository();
    }
    async createBooking(data){
        try{
            const flightId= data.flightId;
            let getFlightURL=`${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;
            const flight=await axios.get(getFlightURL);
            return flight.data;

        }catch(error){
            throw new ServiceError('Cannot create booking');
        }

    }
}

module.exports=BookingService;
