require('dotenv').config();
const app = require('./src/app');
const dbConnect = require('./src/config/dbConnect');

const PORT = process.env.PORT || 5000;

// Connect DB then start server
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(` Methynix Server running on port ${PORT}`);
  });
});