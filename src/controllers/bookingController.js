const Booking = require("~/models/Booking");

// Lấy tất cả booking
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().lean();
    // const bookings = await Booking.find().populate('customerId').populate('garageId');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách booking", error });
  }
};

// // Tạo booking mới
// exports.createBooking = async (req, res) => {
//   try {
//     const newBooking = new Booking(req.body);
//     const savedBooking = await newBooking.save();
//     res.status(201).json(savedBooking);
//   } catch (error) {
//     res.status(400).json({ message: "Lỗi khi tạo booking", error });
//   }
// };
// const Booking = require("../models/Booking");

// 📌 Đặt lịch mới
exports.createBooking = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      service,
      bookingDate, // bookingDate cần chứa { date, timeSlot }
      cancelReason,
    } = req.body;

    const customerId = "67cfb1494fd45f254a02e4f6"; // ID khách hàng mẫu
    const garageId = "652f1a5e8a3b45b6e89f5b08"; // ID garage mẫu

    // Kiểm tra đủ dữ liệu
    if (
      !customerId ||
      !garageId ||
      !service ||
      !bookingDate ||
      !bookingDate.date ||
      !bookingDate.timeSlot
    ) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }

    // Tạo đơn đặt lịch
    const newBooking = new Booking({
      customerId,
      customerName,
      customerPhone,
      customerEmail,
      service,
      bookingDate: {
        date: bookingDate.date,
        timeSlot: bookingDate.timeSlot,
      },
      garageId,
      status: "Pending",
      cancelReason: cancelReason || "", // Nếu không có lý do hủy thì mặc định là chuỗi rỗng
    });

    await newBooking.save();

    res.status(201).json({
      message: "Đặt lịch thành công!",
      booking: newBooking,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đặt lịch!", error });
  }
};

// Cập nhật booking (bao gồm lý do hủy nếu bị Cancelled)
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, cancelReason } = req.body;

    const updateData = { status };
    if (status === "Cancelled" && cancelReason) {
      updateData.cancelReason = cancelReason;
    }

    const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBooking) {
      return res.status(404).json({ message: "Không tìm thấy booking" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật booking", error });
  }
};
