
const { User } = require("../models/UserModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(request, response) {
    // Importing the username and password from the request body
    const { username, password } = request.body;

    console.log(username);
    // Checking to see if the username exists
    const existingUser = await User.findOne({ username });

    console.log(existingUser);
    // If the username exists, send an error message
    if (existingUser) {
        return response
        .status(400)
        .json({
            "message": "User already exists!"
        });
    }

    // Use bcrypt to hash the password
    const hasedPassword = await bcrypt.hash(password, 10); // 10 is the salt value

    // Create the user using the User model
    const user = await User.create({
        username,
        password: hasedPassword 
    });

    // Send a response acknowledgement message
    response
    .status(201)
    .json({
        "message": "User registered Successfully!"
    });
}

async function loginUser(request, response) {
    // Importing the username and password from the request body
    const { username, password } = request.body;

    // Check if the user is in the database
    const user = await User.findOne({ username });

    // If the user does not exist, send an error message
    if (!user){
        return response
        .status(400)
        .json({
            "message": "Invalid Credentials."
        });
    }

    // Check if the password is valid, compare(password entered by the user, hashed password in the database)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return response
        .status(400)
        .json({
            "message": "Invalid password."
        });
    }

    const token = jwt.sign(
        { userId: user._id}, // Payload data
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    response.json(
        { token }
    );
}

module.exports = {
    registerUser,
    loginUser
};