const express = require("express");
const {users} = require('./data/users.json')

const app = express();

// importing routers
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const port = 8081;

app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).json({
        message: "Home Page"
    });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);




app.listen(port, () => {
    console.log(`Server is up and running at http://localhost:${port}`);
    
})