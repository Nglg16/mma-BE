const express = require("express");
const router = express.Router();
const bookingController = require("~/controllers/bookingController");

router.get("/", bookingController.getAllBookings);
router.put("/:id", bookingController.updateBooking);

//customer
router.post("/", bookingController.createBooking);

module.exports = router;
