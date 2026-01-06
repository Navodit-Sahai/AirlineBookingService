const {BookingRepository}=require('../repository/index');
const axios=require('axios');
const {FLIGHT_SERVICE_PATH}=require('../config/serverConfig');
const { ServiceError } = require('../utils/errors');


class BookingService{
    constructor(){
        this.bookingRepository=new BookingRepository();
    }
    async createBooking(data){
        try{
            const flightId= data.flightId;
            let getFlightURL=`${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;
            const flight=await axios.get(getFlightURL);
            const flightData= flight.data.data;
            let price=flightData.price;
            if(data.noOfSeats>flightData.totalSeats){
                 throw new ServiceError('Something went wrong in the booking process','Insufficient Seats');
            }
            const totalCost=price*data.noOfSeats;
            const bookingPayload={...data,totalCost};
            const booking =await this.bookingRepository.create(bookingPayload);
            const updateFlightURL=`${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;
            await axios.patch(updateFlightURL,{
                totalSeats: flightData.totalSeats - data.noOfSeats
            });

            return booking;

        }catch(error){
            console.log(error);
            if(error.name==='RepositoryError'|| error.name==='ValidationError')
                throw error;
            else throw new ServiceError('Cannot create booking');
        }

    }
}

module.exports=BookingService;
