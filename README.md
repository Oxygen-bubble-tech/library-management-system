# library-management-system
Express js learning project for library management system.

- This is a library management API backend for the management of users and the books.

# Routes and the end-points

## /Users
[GET] - All the list of users in the system.
[POST] - Create/Ragister a new user.

## /User info {id}
[GET] - Get a user by their id.
[PUT] - Update a user by their id.
[DELETE] - Deleting a user by their id (if the user still have some issued book, is their any fine to be collected).

## /user/Subscription details{id}
[GET] - Get a user subscription details by their id.

## /books
[GET] - get all the books in the system.
[POST] - Add a new book to the system.

## /bookid
[GET] - get a book by its id.
[PUT] - update a book details by its id.
[DELETE] - Delete a book by its id.

## /books/issued
[GET] - Getting all the issued books.

## /books/issued/withfine
[GET] : get all issued books with their fine amount.

### Subscription types
>> Basic (3 months)
>> Standard (6 months)
>> Premium (12 months)

>> If a user misses a renewal date, then the user should be collected 100 rupees.
>> If the user misses the subscription, then the user is expected to pay 100 rupees.
>> If a user misses both renewal and subscription, then the collected amount should be 200 rupees.

## Commands
npm init
npm i express
npm i nodemon --save -dev

## To run the application
npm run dev

## To restore node modules and package-lock.json
npm i
npm install