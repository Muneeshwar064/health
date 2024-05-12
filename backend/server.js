const express = require("express");
const dotenv = require("dotenv").config();
const db = require("./config/db");
const cors = require('cors');
const path = require('path');
db();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/api/hospital', require("./routes/emergencyUserDetails"));
app.use('/api/html', require("./routes/htmlRoute"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/patientDetails", require("./routes/patientDetail"));
app.use("/api/mail", require("./routes/mailRoute"));
app.use("/", (req, res) => {
  res.status(404).json({ error: "Oh no error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
  console.log(`Server is running on http://${getLocalIpAddress()}:${PORT}`);
}
);

function getLocalIpAddress() {
  const { networkInterfaces } = require('os');
  const interfaces = networkInterfaces();
  for (const interfaceName of Object.keys(interfaces)) {
    for (const iface of interfaces[interfaceName]) {
      if (!iface.internal && iface.family === 'IPv4') {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}