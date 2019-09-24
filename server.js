const express = require("express");
const app = express();
// const connectDB = require("./config/db");
const path = require("path");
// const route = require("./routes/");

// connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
// app.use(route);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));