const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routers/index');
const mongoose = require('mongoose');
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Application running well"));

app.use(userRouter)

const usedDb = process.env.NODE_ENV === "TEST" ? process.env.MONGO_URI_TEST : process.env.MONGO_URI

mongoose.connect(usedDb)
    .then(
        () => console.log('MongoDB connected')
    )
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app



