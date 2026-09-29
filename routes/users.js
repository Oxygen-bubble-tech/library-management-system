const express = require("express");
const { users } = require('../data/users.json');

const router = express.Router();




/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of users
 * Access: Public
 * Parameters : None
 */

router.get('/', (req,res) => {
    res.status(200).json({
        success: true,
        data: users
    })
});

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get user by their id
 * Access: Public
 * Parameters : id
 */

router.get('/:id', (req, res) => {

    const {id} = req.params;
    const user = users.find((each) => each.id === id);

    if(!user){
        return        res.status(404).json({
            success: false,
            message: `user not found for id: ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: user
    })
});

/**
 * Route: /users
 * Method: post
 * Description: create/ragister new user
 * Access: Public
 * Parameters : none
 */

router.post('/',(req,res) => {            
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

    // check if all the required fields are present
    if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        })
    }

    // check if the user already exists
    const user = users.find((each) => each.id === id);
    if(user){
        return res.status(409).json({
            success: false,
            message: `User already exists with id:${id}`
        })
    }

    // push into user array
    users.push({id, name, surname, email, subscriptionType, subscriptionDate })

    res.status(201).json({
        success: true,
        message: "User created successfully"
    })
});

/**
 * Route: /users/:id
 * Method: put
 * Description: updating a user by their ID
 * Access: Public
 * Parameters : ID
 */

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    // check if the user exists
    const user = users.find((each) => each.id === id)
    if(!user){
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    // if user exists, update the user

    // Object.assign(user, data);
    // with spread operator
    const updatedUser = users.map((each) => {
        if(each.id===id){
            return {
                ...each,
                ...data,
            }
        }
        return each
    })

    res.status(200).json({
        success: true,
        data: updatedUser,
        message : "User updated successfully"
    })
})

// app.all('/api',(req,res)=>{
//     res.status(500).json({
//         message : "Not built yet"
//     });
// });

/**
 * Route: /users/:id
 * Method: Delete
 * Description: deleting a user by their ID
 * Access: Public
 * Parameters : ID
 */

router.delete('/:id', (req,res) => {
    const {id} = req.params;

    // check if the user exists
    const user = users.find((each)=>each.id === id)
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id: ${id}`
        })
    }

    // If user exists, filter it out from the users array
    const updatedUsers = users.filter((each)=>each.id !== id)

    res.status(200).json({
        success: true,
        data: updatedUsers,
        message: "User Deleted Successfully"
    })
});

/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get all the subscription details of a user by their ID
 * Access: Public
 * Parameters: ID
 */

router.get('/subscription-details/:id', (req,res) => {
    const { id } = req.params;

    // find the user by id
    const user = users.find((each) => each.id === id);
    if (!user){
        return res.status(404).json({
            success: false,
            message: `User not found`
        });
    }

    // Extract the subscription details
    const getDateInDays = (data = '') => {
        let date;
        if(data){
            date = new Date(data);
        }else{
            date = new Date();
        }
        let days = Math.floor(date/(1000*60*60*24));
        return days;
    }

    const subscriptionType = (date) => {
        if(user.subscriptionType === "Basic"){
            date = date + 90
        }else if(user.subscriptionType === "standard"){
            date = date + 180
        }else if (user.subscriptionType === "Premium"){
            date = date + 365
        }
        return date;
    }

    // Subscription expiration calculation
    // january 1, 1970 utc

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        subscriptionDaysLeft: subscriptionExpiration - currentDate,
        daysLeftForExpiration: returnDate - currentDate,
        returnDate: returnDate < currentDate ? "Book is overdue" : returnDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 :0
    }

    res.status(200).json({
        success: true,
        data
    });
});

module.exports = router;