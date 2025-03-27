console.log("fghjkl");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");

// Import models (do not change the file names)
const User = require("./module/user.module.js");
const Login = require("./module/loginSchema.js");
const CarService = require("./module/carService.model.js");
const Appointment = require("./module/appointment.model.js");
const Ridefull = require("./module/Ridefull.model.js");
const Carpool = require("./module/carpool.model.js"); // Now exports "Carpool"
const bookingcp = require("./module/bookingcp.model.js");
const feedback = require("./module/feedback.model.js");
const CarWash = require("./module/carWash.model.js");

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // For form-data
app.use(cors());
const upload = multer();

const MONGO_URI = "mongodb+srv://bharath:bharath123@cluster0.zyvp4.mongodb.net/CarifyDB?retryWrites=true&w=majority";

mongoose
    .connect(MONGO_URI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// ✅ Base Route
app.get("/", (req, res) => {
    res.send("🚀 Welcome to Carify Backend API");
});

// ✅ Test Route
app.post("/api/carpool/book", async (req, res) => {
    console.log("Carpool booking route hit!");
    res.status(200).json({ message: "Route is working!" });
});

// 🟢 Get all users
app.get("/api/login", async (req, res) => {
    try {
        const users = await Login.find({});
        res.status(200).json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});

// 🟢 Signup (User Registration)
// 🟢 Signup (User Registration)
app.post("/api/signup", upload.none(), async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
                data: []
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: "Email already registered",
                data: []
            });
        }

        // Hash password and save new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({
            status: true,
            message: "User registered successfully",
            data: [
                {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            ]
        });
    } catch (err) {
        console.error("Signup Error:", err.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: []
        });
    }
});


// 🟢 Login (Registration)
// 🟢 Login (User Authentication)
app.post("/api/login", upload.none(), async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password are required",
                data: []
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                status: false,
                message: "Invalid email or password",
                data: []
            });
        }app.post("/api/login", upload.none(), async (req, res) => {
            try {
                const { email, password } = req.body;
        
                // Validate required fields
                if (!email || !password) {
                    return res.status(400).json({
                        status: false,
                        message: "Email and password are required",
                        data: []
                    });
                }
        
                // Check if user exists
                const existingUser = await User.findOne({ email });
                if (!existingUser) {
                    return res.status(400).json({
                        status: false,
                        message: "Invalid email or password",
                        data: []
                    });
                }
        
                // Validate password
                const isPasswordValid = await bcrypt.compare(password, existingUser.password);
                if (!isPasswordValid) {
                    return res.status(400).json({
                        status: false,
                        message: "Invalid email or password",
                        data: []
                    });
                }
        
                // Successful login response
                return res.status(200).json({
                    status: true,
                    message: "Login successful",
                    data: [
                        {
                            id: existingUser._id,
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    ]
                });
            } catch (err) {
                console.error("Login error:", err.message);
                return res.status(500).json({
                    status: false,
                    message: "Internal Server Error",
                    data: []
                });
            }
        });
        

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                status: false,
                message: "Invalid email or password",
                data: []
            });
        }

        // Successful login response
        return res.status(200).json({
            status: true,
            message: "Login successful",
            data: [
                {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email
                }
            ]
        });
    } catch (err) {
        console.error("Login error:", err.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: []
        });
    }
});


// 🟢 Update user by ID
app.put("/api/login/:id", upload.none(), async (req, res) => {
    try {
        const { id } = req.params;

        // Find and update the user
        const updatedLogin = await Login.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedLogin) {
            return res.status(404).json({
                status: false,
                message: "User not found",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "User updated successfully",
            data: [
                {
                    id: updatedLogin._id,
                    name: updatedLogin.name,
                    email: updatedLogin.email
                }
            ]
        });
    } catch (err) {
        console.error("Update User Error:", err.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: []
        });
    }
});


// 🟢 Delete user by ID
app.delete("/api/login/:id", upload.none(), async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the user
        const removedUser = await Login.findByIdAndDelete(id);

        if (!removedUser) {
            return res.status(404).json({
                status: false,
                message: "User not found",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "User removed successfully",
            data: []
        });
    } catch (err) {
        console.error("Delete User Error:", err.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: []
        });
    }
});


// 🟢 User login route
app.post("/api/users", upload.none(), async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password are required",
                data: []
            });
        }

        // Check if user exists
        const existingUser = await Login.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                status: false,
                message: "User not found",
                data: []
            });
        }

        // Validate password
        if (existingUser.password !== password) {
            return res.status(401).json({
                status: false,
                message: "Invalid password",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Login successful",
            data: [
                {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email
                }
            ]
        });
    } catch (err) {
        console.error("User Login Error:", err.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: []
        });
    }
});


// 🔹 Get Nearby Car Services
app.get("/api/services", upload.none(), async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // Validate required fields
        if (!latitude || !longitude) {
            return res.status(400).json({
                status: false,
                message: "Location (latitude, longitude) is required",
                data: []
            });
        }

        // Fetch all car services
        const services = await CarService.find();

        return res.status(200).json({
            status: true,
            message: "Nearby car services retrieved successfully",
            data: services
        });
    } catch (err) {
        console.error("Get Car Services Error:", err.message);
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: []
        });
    }
});

// 🔹 Add a New Car Service
app.post("/api/services", upload.none(), async (req, res) => {
    try {
        console.log("Received Data:", req.body);

        const { name, description, latitude, longitude, contact } = req.body;

        // Validate required fields
        if (!name || !description || !latitude || !longitude || !contact) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
                data: []
            });
        }

        // Create a new car service entry
        const newService = new CarService({
            name,
            description,
            location: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
            contact
        });

        await newService.save();

        return res.status(201).json({
            status: true,
            message: "Car service added successfully",
            data: [
                {
                    id: newService._id,
                    name: newService.name,
                    description: newService.description,
                    location: newService.location,
                    contact: newService.contact
                }
            ]
        });
    } catch (err) {
        console.error("Add Car Service Error:", err.message);
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: []
        });
    }
});


// 🔹 Book an Appointment
app.post("/api/appointments", upload.none(), async (req, res) => {
    try {
        const { userId, serviceId, date, time } = req.body;

        // Validate required fields
        if (!userId || !serviceId || !date || !time) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
                data: []
            });
        }

        // Create a new appointment
        const newAppointment = new Appointment({ userId, serviceId, date, time });
        await newAppointment.save();

        return res.status(201).json({
            status: true,
            message: "Appointment booked successfully",
            data: [
                {
                    id: newAppointment._id,
                    userId: newAppointment.userId,
                    serviceId: newAppointment.serviceId,
                    date: newAppointment.date,
                    time: newAppointment.time
                }
            ]
        });
    } catch (err) {
        console.error("Book Appointment Error:", err.message);
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: []
        });
    }
});

// 🔹 Get Garage Contact Details
app.get("/api/service/contact/:id", upload.none(), async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "Invalid service ID format",
                data: []
            });
        }

        // Fetch the service details
        const service = await CarService.findById(id);

        if (!service) {
            return res.status(404).json({
                status: false,
                message: "Service not found",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Service contact details retrieved successfully",
            data: [
                {
                    id: service._id,
                    name: service.name,
                    contact: service.contact
                }
            ]
        });
    } catch (err) {
        console.error("Get Garage Contact Error:", err.message);
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: []
        });
    }
});



// ✅ Get Previous Car Services (Completed Services)
app.get("/carServices/previous", async (req, res) => {
    try {
        console.log("🔹 Fetching previous car services...");

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Fetch previous services
        const previousServices = await CarService.find({ date: { $lt: today } }).sort({ date: -1 });

        if (previousServices.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No previous car services found.",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Previous car services retrieved successfully.",
            data: previousServices.map(service => ({
                id: service._id,
                name: service.name,
                description: service.description,
                date: service.date,
                contact: service.contact
            }))
        });

    } catch (err) {
        console.error("❌ Error fetching previous services:", err);
        return res.status(500).json({
            status: false,
            message: "Server error while fetching previous car services.",
            data: []
        });
    }
});


// ✅ Get Upcoming Car Services (Scheduled Services)
app.get("/carServices/upcoming", async (req, res) => {
    try {
        console.log("🔹 Fetching upcoming car services...");

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Fetch upcoming services
        const upcomingServices = await CarService.find({ date: { $gte: today } }).sort({ date: 1 });

        if (upcomingServices.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No upcoming car services found.",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Upcoming car services retrieved successfully.",
            data: upcomingServices.map(service => ({
                id: service._id,
                name: service.name,
                description: service.description,
                date: service.date,
                contact: service.contact
            }))
        });

    } catch (err) {
        console.error("❌ Error fetching upcoming services:", err);
        return res.status(500).json({
            status: false,
            message: "Server error while fetching upcoming car services.",
            data: []
        });
    }
});


// API to Submit Feedback
app.post("/api//submit-feedback", async (req, res) => {
    try {
        const { user, rating, comment } = req.body;

        // Validation check
        if (!user || !rating) {
            return res.status(400).json({
                status: false,
                message: "User and rating are required",
                data: []
            });
        }

        const newFeedback = new feedback({ user, rating, comment });
        await newFeedback.save();

        res.status(201).json({
            status: true,
            message: "Feedback submitted successfully!",
            data: [newFeedback] // Returning the saved feedback
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: []
        });
    }
});

// API to Get All Feedback
app.get("/api/get-feedback", async (req, res) => {
    try {
        const feedbacks = await feedback.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: true,
            message: "Feedback retrieved successfully",
            data: feedbacks
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            data: []
        });
    }
});























// ✅ Get Available Carpools
app.get("/api/carpool", upload.none(), async (req, res) => {
    try {
        console.log("🔹 Fetching available carpools...");

        const carpools = await Carpool.find();

        if (carpools.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No available carpools found.",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Available carpools retrieved successfully.",
            data: carpools.map(carpool => ({
                id: carpool._id,
                driverName: carpool.driverName,
                startLocation: carpool.startLocation,
                destination: carpool.destination,
                availableSeats: carpool.availableSeats,
                contact: carpool.contact
            }))
        });

    } catch (err) {
        console.error("❌ Error fetching carpools:", err);
        return res.status(500).json({
            status: false,
            message: "Server error while fetching available carpools.",
            data: []
        });
    }
});


// ✅ Add a New Carpool
app.post("/api/carpool", upload.none(), async (req, res) => {
    try {
        console.log("Received Data:", req.body);

        const { driver, seatsAvailable, date, time, contact, route } = req.body;
        const from = route?.from;
        const to = route?.to;

        if (!driver || !seatsAvailable || !from || !to || !date || !time || !contact) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
                data: []
            });
        }

        const newCarpool = new Carpool({ 
            driver, 
            seatsAvailable, 
            route: { from, to }, 
            date, 
            time, 
            contact 
        });

        await newCarpool.save();

        return res.status(201).json({
            status: true,
            message: "Carpool added successfully",
            data: [
                {
                    id: newCarpool._id,
                    driver: newCarpool.driver,
                    seatsAvailable: newCarpool.seatsAvailable,
                    from: newCarpool.route.from,
                    to: newCarpool.route.to,
                    date: newCarpool.date,
                    time: newCarpool.time,
                    contact: newCarpool.contact
                }
            ]
        });

    } catch (err) {
        console.error("❌ Error adding carpool:", err.message);
        return res.status(500).json({
            status: false,
            message: "Server error while adding carpool",
            data: []
        });
    }
});

// ✅ Search Available Carpools
app.get("/api/search", upload.none(), async (req, res) => {
    try {
        let { from, to, date, travelers } = req.query;

        // Validate query parameters
        if (!from || !to || !date || !travelers) {
            return res.status(400).json({
                status: false,
                message: "Please provide from, to, date, and travelers!",
                data: []
            });
        }

        // Trim and format inputs safely
        from = from?.trim().toLowerCase();
        to = to?.trim().toLowerCase();
        travelers = parseInt(travelers, 10);

        if (isNaN(travelers) || travelers <= 0) {
            return res.status(400).json({
                status: false,
                message: "Invalid number of travelers",
                data: []
            });
        }

        // Convert date to proper range (full day)
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        // Search for available carpools
        const availableCarpools = await Carpool.find({
            "route.from": from,
            "route.to": to,
            date: { $gte: startDate, $lte: endDate },
            seatsAvailable: { $gte: travelers }
        });

        if (availableCarpools.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No carpools found for this route.",
                data: []
            });
        }

        res.status(200).json({
            status: true,
            message: "Available carpools found",
            data: availableCarpools.map(carpool => ({
                id: carpool._id,
                driver: carpool.driver,
                seatsAvailable: carpool.seatsAvailable,
                from: carpool.route.from,
                to: carpool.route.to,
                date: carpool.date,
                time: carpool.time,
                contact: carpool.contact
            }))
        });

    } catch (error) {
        console.error("❌ Error searching carpools:", error);
        res.status(500).json({
            status: false,
            message: "Server error while searching carpools",
            data: []
        });
    }
});

// ✅ Get Carpool Details by ID
app.get("/api/carpool/:id", upload.none(), async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "Invalid carpool ID format",
                data: []
            });
        }

        // Fetch carpool details
        const foundCarpool = await Carpool.findById(id);
        if (!foundCarpool) {
            return res.status(404).json({
                status: false,
                message: "Carpool not found",
                data: []
            });
        }

        res.status(200).json({
            status: true,
            message: "Carpool details fetched successfully",
            data: {
                id: foundCarpool._id,
                driver: foundCarpool.driver,
                seatsAvailable: foundCarpool.seatsAvailable,
                from: foundCarpool.route.from,
                to: foundCarpool.route.to,
                date: foundCarpool.date,
                time: foundCarpool.time,
                contact: foundCarpool.contact
            }
        });

    } catch (error) {
        console.error("❌ Error fetching carpool details:", error);
        res.status(500).json({
            status: false,
            message: "Server error while fetching carpool details",
            data: []
        });
    }
});




  




// 1️⃣ Create a Carpool Booking (POST)
app.post("/api/bookingcps", upload.none(), async (req, res) => {
    try {
        const { carpoolId, route, date, travelers, passengerName, contact } = req.body;

        const newBooking = new bookingcp({
            carpoolId,
            route: {
                from: route.from,
                to: route.to
            },
            date,
            travelers,
            passengerName,
            contact
        });

        await newBooking.save();
        res.status(201).json({
            status: true,
            message: "Carpool booking created successfully",
            data: [newBooking]
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message,
            data: []
        });
    }
});


// 2️⃣ Get All Carpool Bookings (GET) ✅ Fixed Route & Async Issue
app.get("/api/bookingcps", async (req, res) => {
    try {
        const allBookings = await bookingcp.find(); // Use correct model name

        res.status(200).json({
            status: true,
            message: "Carpool bookings retrieved successfully",
            data: allBookings
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: []
        });
    }
});
  
app.get("/api/bookingcps/:id", async (req, res) => {
    try {
        const booking = await bookingcp.findById(req.params.id); // Use correct model name

        if (!booking) {
            return res.status(404).json({
                status: false,
                message: "Booking not found",
                data: []
            });
        }

        res.status(200).json({
            status: true,
            message: "Booking retrieved successfully",
            data: [booking]
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: []
        });
    }
});
  
// 4️⃣ Update a Booking (POST)
app.post("/api/bookingcps/update/:id", async (req, res) => {
    try {
        const updatedBooking = await bookingcp.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedBooking) {
            return res.status(404).json({
                status: false,
                message: "Booking not found",
                data: []
            });
        }

        res.status(200).json({
            status: true,
            message: "Booking updated successfully",
            data: [updatedBooking]
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message,
            data: []
        });
    }
});

  
  // 5️⃣ Delete a Booking (POST)
app.post("/api/bookingcps/delete/:id", async (req, res) => {
    try {
        const deletedBooking = await bookingcp.findByIdAndDelete(req.params.id);

        if (!deletedBooking) {
            return res.status(404).json({
                status: false,
                message: "Booking not found",
                data: []
            });
        }

        res.status(200).json({
            status: true,
            message: "Booking deleted successfully",
            data: []
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
            data: []
        });
    }
});


// ✅ Publish a Full Car Ride
app.post("/api/publish", upload.none(), async (req, res) => {
    try {
        const { name, contact, route_from, route_to, date, time, carType } = req.body;

        // 🛑 Validate request data
        if (!name || !contact || !route_from || !route_to || !date || !time || !carType) {
            return res.status(400).json({
                status: false,
                message: "All fields are required!",
                data: {}
            });
        }

        // 🎯 Determine seat capacity based on car type
        const seats = carType === "5-seater" ? 5 : 7;

        // 🆕 Create new ride entry
        const newRide = new Ridefull({
            name,
            contact,
            route: { from: route_from, to: route_to },
            date,
            time,
            carType,
            seatsAvailable: seats,
            fullCapacity: true
        });

        await newRide.save();


    } catch (error) {
        console.error("❌ Error while publishing ride:", error);
        res.status(500).json({
            status: false,
            message: "Server error while publishing ride",
            data: { error: error.message }
        });
    }
});


// ✅ Get All Full Car Rides
app.get("/api/rides", async (req, res) => {
    try {
        console.log("🔹 Fetching all full car rides...");
        const rides = await Ridefull.find();

        if (rides.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No full car rides found",
                data: []
            });
        }

        res.status(200).json({
            status: true,
            message: "✅ Full car rides retrieved successfully",
            data: rides
        });

    } catch (error) {
        console.error("❌ Error fetching full car rides:", error);
        res.status(500).json({
            status: false,
            message: "Server error while fetching full car rides",
            data: { error: error.message }
        });
    }
});


// ✅ Get Full Capacity Rides
// ✅ Get Full-Capacity Carpools
app.get("/api/carpool/full-capacity", async (req, res) => {
    try {
        console.log("🔹 Fetching full-capacity carpools...");
        const fullCapacityRides = await Carpool.find({ fullCapacity: true });

        if (fullCapacityRides.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No full-capacity rides available.",
                data: []
            });
        }

        res.status(200).json({
            status: true,
            message: "✅ Full-capacity rides retrieved successfully",
            data: fullCapacityRides
        });

    } catch (error) {
        console.error("❌ Error fetching full-capacity carpools:", error);
        res.status(500).json({
            status: false,
            message: "Server error while fetching full-capacity carpools",
            data: { error: error.message }
        });
    }
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


// ✅ API to Fetch Nearby Car Wash Stores
app.get("/api/carwash/nearby", async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ status: false, message: "Latitude and longitude are required" });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);
        const maxDistance = 10 / 6371; // 10 km radius in radians (Earth radius = 6371 km)

        const nearbyCarWashes = await CarWash.find({
            location: {
                $geoWithin: { $centerSphere: [[userLon, userLat], maxDistance] }
            }
        });

        return res.status(200).json({
            status: true,
            message: "Nearby car wash stores retrieved successfully",
            data: nearbyCarWashes,
        });
    } catch (error) {
        console.error("Error fetching nearby car washes:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});


// ✅ API to Add a New Car Wash Store
app.post("/api/carwash/add", async (req, res) => {
    try {
        const { name, address, latitude, longitude, contact, rating } = req.body;

        // ✅ Validate required fields
        if (!name || !address || !latitude || !longitude || !contact) {
            return res.status(400).json({ 
                status: false, 
                message: "All fields except rating are required" 
            });
        }

        // ✅ Create a new Car Wash store
        const newCarWash = new CarWash({
            name,
            address,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            contact,
            rating: rating ? parseFloat(rating) : 0
        });

        // ✅ Save to MongoDB
        await newCarWash.save();

        return res.status(201).json({
            status: true,
            message: "Car wash store added successfully",
            data: newCarWash
        });
    } catch (error) {
        console.error("Error adding car wash store:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
