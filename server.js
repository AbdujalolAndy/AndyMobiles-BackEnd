const env = require("dotenv");
const mongoose = require("mongoose");
const color = require("colors/safe");
env.config();

console.log(process.env.NODE_ENV)
const MONGODB_URL =
  process.env.NODE_ENV === "production" ? null : process.env.MONGODB_URL;
const PORT = process.env.PORT || 3001;

mongoose.set({ strictQuery: false });
mongoose
  .connect(MONGODB_URL)
  .then((data) => {
    console.log(color.bgBlue("Connected to the server!"));
    const server = require("./app");
    server.listen(
      PORT,
      console.info(
        color.bgCyan(`Backend server is listening on ${PORT} port,`),
        color.bgMagenta(`http://localhost:${PORT}`)
      )
    );
  })
  .catch((err) =>
    console.log(color.bgRed(`MongoDb Connection error, ${err.message}`))
  );
