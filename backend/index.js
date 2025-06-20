const express= require('express');
const cors = require('cors');
const queryRoutes = require('./Router/queryRoutes');
require('dotenv').config();

const PORT= process.env.PORT||8080;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/");
app.use('/query', queryRoutes); 

app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`);
})
