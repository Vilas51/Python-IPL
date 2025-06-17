const express= require('express');
require('dotenv');

const PORT= process.env.PORT||8080;

const app = express();

app.get

app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`);
})