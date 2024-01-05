const userModel = require("../model/userModel");

const registerUser = async (req,res) => {
    // step1 : check incomming data
    console.log(req.body)

    // step 2: destructuring
    const {firstname, lastname, email , password} = req.body;

    // step 3 : validate
    if(!firstname || !lastname || !email || !password){
        return res.send("Enter all the fields!!")
    }

    // try catch block for data registration
    try {
        //  step 4: check if user already exists (fieldname : value)
        const existingUser = await userModel.findOne({email : email})
        if(existingUser){
            return res.send("User already exists!!")
        }

        // step 5: Save the user to database
        const newUser = new userModel({
            firstname : firstname,
            lastname : lastname,
            email : email,
            password : password
        })
        await newUser.save();
        res.send("User registered successfully!!")

    } catch (error) {
        res.send("Server error!")
    }

}

const loginUser = async (req,res) =>{
    console.log(req.body)

    // destructuring
    const {email, password} = req.body;

    // validate
    if(!email || !password){
        return res.send("Enter all the fields!!")
    }

    try {
        // check if user exists
        const existingUser = await userModel.findOne({email : email})
        if(!existingUser){
            return res.send("User does not exists!!")
        }

        // check if password is correct
        if(password !== existingUser.password){
            return res.send("Password is incorrect!!")
        }

        res.send(existingUser)

        
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    registerUser,
    loginUser
}

