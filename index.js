const express = require("express");

const app = express();

const port = 8081;

app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).json({
        message: "Home Page"
    });
});

// app.all('/api',(req,res)=>{
//     res.status(500).json({
//         message : "Not built yet"
//     });
// });

app.listen(port, () => {
    console.log(`Server is up and running at http://localhost:${port}`);
    
})