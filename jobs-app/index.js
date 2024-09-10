const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// const express = require('express');
// const cors = require('cors');

// const app = express();

// // Enable CORS for requests from the frontend (typically localhost:5173 for Vite)
// app.use(cors({
//     origin: 'http://localhost:5173'  // This should match the port where your frontend is running
// }));

// // Other middlewares
// app.use(express.json());

// // Your routes
// const jobsRoutes = require('./routes/jobs'); // Example route file
// app.use('/api/jobs', jobsRoutes);

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
