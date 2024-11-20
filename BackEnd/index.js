const express = require('express')
const cors = require('cors')
const bp = require('body-parser')
const myDb = require('./MongoDb')
const App = new express()
const PORT = 9000
const multer = require('multer');
const path = require('path');
// Define the allowed origin
const si = require('systeminformation');
const allowedOrigin = 'http://localhost:3000';

// Custom middleware to enforce origin checking
App.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // Check if the origin is allowed
    if (origin && origin !== allowedOrigin) {
        // Reject the request if the origin doesn't match
        return res.status(403).json({ message: 'Access Forbidden: Origin not allowed' });
    }

    // Set headers if the origin is allowed
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Allow preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

App.use(bp.json())
App.use(express.urlencoded({ extended: false}))



App.get('/api/storage', async (req, res) => {
  try {
    const diskData = await si.fsSize();
    const total = (diskData[0].size / (1024 ** 3)).toFixed(0); // Convert to GB
    const used = (diskData[0].used / (1024 ** 3)).toFixed(0);  // Convert to GB
    const usedPercentage = Math.round((used / total) * 100);

    res.json({
      usedPercentage,
      usedStorage: `${used}GB`,
      totalStorage: `${total}GB`
    });
  } catch (error) {
    console.error('Error fetching disk usage:', error);
    res.status(500).send('Error fetching disk usage');
  }
});


App.post("/api/login",async(req,resp)=>{

    var EmailId = req.body.EmailId
    var Password = req.body.Password

    console.log(EmailId)
    console.log(Password)

    const LoginCollection  = myDb.collection("Login")

    var result = await LoginCollection.find({EmailId:EmailId,Password:Password}).toArray()

    resp.send(result)
})

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Save files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
    },
  });
  
  const upload = multer({ storage: storage });
  
  // Route to handle file upload
  App.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    res.send("File uploaded successfully.");
  });
  

  App.post("/api/register", async (req, resp) => {
    const { EmailId, Password, ConfirmPassword } = req.body; // Extract values from req.body
  
    // Check if password and confirm password match
    if (ConfirmPassword === Password) {
      const LoginCollection = myDb.collection("login");
  
      // Check if the email already exists
      const result = await LoginCollection.find({ EmailId: EmailId }).toArray();
  
      if (result.length === 0) {
        // Insert new user if email doesn't exist
        await LoginCollection.insertOne({ EmailId: EmailId, Password: Password });
        return resp.send({ message: 1 }); // Send success response and return to stop further execution
      } else {
        // Email already exists
        return resp.send({ message: -1 }); // Optional: Different code for "Email already registered"
      }
    }
  
    // If passwords do not match, send an error response
    resp.send({ message: 0 });
  });
  

App.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log("Server Running at port " + PORT);
});
