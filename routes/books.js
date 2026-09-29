const express = require("express");
const { books } = require('../data/books.json');
const { users } = require('../data/users.json');

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the list of books in the system
 * Access: Public
 * Parameters : None
 */

router.get('/', (req,res) => {
    res.status(200).json({
        success: true,
        data: books
    })
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get books by their id
 * Access: Public
 * Parameters : id
 */

router.get('/:id', (req, res) => {

    const {id} = req.params;
    const book = books.find((each) => each.id === id);

    if(!book){
        return        res.status(404).json({
            success: false,
            message: `Book not found for id: ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: book
    })
});

/**
 * Route: /books
 * Method: post
 * Description: create/ragister new book
 * Access: Public
 * Parameters : none
 */

router.post('/',(req,res) => {            
    const {id, name, author, price, publisher} = req.body;

    // check if all the required fields are present
    if(!id || !name || !author || !price || !publisher){
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        })
    }

    // check if the user already exists
    const book = books.find((each) => each.id === id);
    if(book){
        return res.status(409).json({
            success: false,
            message: `Book already exists with id:${id}`
        })
    }

    // push into user array
    books.push({id, name, author, price, publisher});

    res.status(201).json({
        success: true,
        message: "Book added successfully"
    })
});

/**
 * Route: /books/:id
 * Method: put
 * Description: updating a user by their ID
 * Access: Public
 * Parameters : ID
 */

router.put('/:id', (req, res)=> {
    const {id} = req.params;
    const { data } = req.body;

    // check if the book exists
    const book = books.find((each)=>each.id === id)
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id: ${id}`
        })
    }

    // update the book details
    // Object.assign(book, data);

    const updatedBook = books.map((each)=> {
        if (each.id === id) {
            return{...each, ...data};
        }
        return each;
    })

    // book.name = name;
    // book.author = author;
    // book.price = price;
    // book.publisher = publisher;

    res.status(200).json({
        success: true,
        message: "Book Updated Successfully",
        data: book
    })
})

/**
 * Route: /books/:id
 * Method: Delete
 * Description: deleting a book by their ID
 * Access: Public
 * Parameters : ID
 */

router.delete('/:id', (req,res) => {
    const {id} = req.params;

    // check if the user exists
    const book = books.find((each)=>each.id === id)
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id: ${id}`
        })
    }

    // If user exists, filter it out from the users array
    const updatedBooks = books.filter((each)=>each.id !== id)

    res.status(200).json({
        success: true,
        data: updatedBooks,
        message: "User Deleted Successfully"
    })
});

/**
 * Route: /books/issued/for-users
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */

router.get('/issued/for-users', (req, res)=>{
    // const issuedBooks = books.filter((each)=> each.issued === true);

    const userWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook){
            return each;
        }
    })

    const issuedBooks = [];

    userWithIssuedBooks.forEach((each)=>{
        const book = books.find((book)=>book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book)
    })

    if(!issuedBooks === 0){
        return res.status(404).json({
            success: false,
            message: "No books issued yet"
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    });
});



module.exports = router;