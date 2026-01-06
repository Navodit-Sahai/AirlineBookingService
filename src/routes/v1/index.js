const express=require('express');
const router=express.Router();
module.exports=router;

const {bookingController}=require('../../controllers/index');
router.post('/bookings',bookingController.create);
module.exports=router;
