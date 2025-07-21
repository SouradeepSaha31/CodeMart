import { buyerModel } from "../models/buyer.model.js";
import { sellerModel } from "../models/seller.model.js"
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


// Buyer Signup Controllers

const buyerSignup = async (req, res) => {
    try {

        console.log(req.body)

        let {userName, email, phoneNumber, password} = req.body;

        if(!userName) return res.status(404).json(apiError(404, "username required"))
        if(!email) return res.status(404).json(apiError(404, "email required"))
        if(!phoneNumber) return res.status(404).json(apiError(404, "phonenumber required"))
        if(!password) return res.status(404).json(apiError(404, "password required"))

        let sameUserFound = await buyerModel.findOne({email : email})
        if(sameUserFound) return res.status(404).json(apiError(404, "Email Id already used"))

        let newUserName = userName.trim()
        let newEmail = email.trim()
        let newPhoneNumber = phoneNumber.trim()
        let newPassword = password.trim()

        if(newPhoneNumber.length !== 10) return res.status(404).json(apiError(404, "phone number must be 10 digits"))

        if(newPassword.length < 4) return res.status(404).json(apiError(404, "password must be 4 digits"))

        await bcrypt.genSalt(15, async (err, salt) => {
            await bcrypt.hash(newPassword, salt, async (err, hash) => {
                let user = await buyerModel.create({
                    userName : newUserName,
                    email : newEmail,
                    phoneNumber : newPhoneNumber,
                    password : hash
                })
                let token = jwt.sign({_id : user._id , email : user.email}, process.env.TOKEN_SECRET)
                res.cookie("token", token);
                user.refreshToken = token;
                user.save()

                let newUser = await buyerModel.findOne({_id : user._id})

                res.status(201).json(apiResponse(201, "user create successfully", newUser))
            })
        })

    } catch (error) {
        console.log("error is user controller in buyerSignup", error);
        res.status(500).json(apiError(500, "user not create"));
    }
}

// Seller Signup Controller

const sellerSignup = async (req, res) => {
    try {
        console.log(req.body);
        
        let {username, email, shopname, phonenumber, password} = req.body;

        if(!username) return res.status(404).json(apiError(404, "username required"))
        if(!email) return res.status(404).json(apiError(404, "email required"))
        if(!shopname) return res.status(404).json(apiError(404, "shopname required"))
        if(!phonenumber) return res.status(404).json(apiError(404, "phonenumber required"))
        if(!password) return res.status(404).json(apiError(404, "password required"))

        let sameUserFound = await sellerModel.findOne({email : email})
        if(sameUserFound) return res.status(404).json(apiError(404, "Email Id already used"))

        let newUserName = username.trim()
        let newEmail = email.trim()
        let newShopname = shopname.trim()
        let newPhoneNumber = phonenumber.trim()
        let newPassword = password.trim()

        if(newPhoneNumber.length !== 10) return res.status(404).json(apiError(404, "phone number must be 10 digits"))

        if(newPassword.length < 4) return res.status(404).json(apiError(404, "password must be 4 digits"))

        await bcrypt.genSalt(15, async (err, salt) => {
            await bcrypt.hash(newPassword, salt, async (err, hash) => {
                let user = await sellerModel.create({
                    userName : newUserName,
                    email : newEmail,
                    shopName : newShopname,
                    phoneNumber : newPhoneNumber,
                    password : hash
                })
                let token = jwt.sign({_id : user._id , email : user.email}, process.env.TOKEN_SECRET)
                res.cookie("token", token);
                user.refreshToken = token;
                user.save()

                let newUser = await sellerModel.findOne({_id : user._id})

                res.status(201).json(apiResponse(201, "user create successfully", newUser))
            })
        })
            
    } catch (error) {
        console.log("error is user controller in sellerSignup", error);
        res.status(500).json(apiError(500, "user not create"));
    }
}

// Login Controller

const login = async (req, res) => {
    try {
        console.log(req.body);

        let {email, password} = req.body;

        if(!email) return res.status(404).json(apiError(404, "email is required"))
        if(!password) return res.status(404).json(apiError(404, "password is required"))
        
        let newEmail = email.trim()
        let newPassword = password.trim()

        var buyer = await buyerModel.findOne({email : newEmail})
        if(!buyer){
            var seller = await sellerModel.findOne({email : newEmail})
            if(!seller){
                return res.status(404).json(apiError(404, "user not found"))
            } else {
                await bcrypt.compare(newPassword, seller.password, async (err, result) => {
                if(result){
                    let token = jwt.sign({_id : seller._id , email : seller.email}, process.env.TOKEN_SECRET)
                    res.cookie("token", token);
                    seller.refreshToken = token;
                    seller.save()
    
                    let newUser = await sellerModel.findOne({email : newEmail})
    
                    res.status(201).json(apiResponse(201, "login successful", newUser))
                } else {
                    res.status(404).json(apiError(404, "passwoed not matched"))
                }
            })    
            }
        } else{
            await bcrypt.compare(newPassword, buyer.password, async (err, result) => {
                if(result){
                    let token = jwt.sign({_id : buyer._id , email : buyer.email}, process.env.TOKEN_SECRET)
                    res.cookie("token", token);
                    buyer.refreshToken = token;
                    buyer.save()
    
                    let newUser = await buyerModel.findOne({email : newEmail})
    
                    res.status(201).json(apiResponse(201, "login successful", newUser))
                } else {
                    res.status(404).json(apiError(404, "passwoed not matched"))
                }
            })

        }

        
    } catch (error) {
        console.log("error is user controller in login", error);
        res.status(500).json(apiError(500, "not login"));
    }
}

// logout

const logout = async (req, res) =>{
    try {

        console.log(req.user)

        res.cookie("token", "")
        let buyer = await buyerModel.findOne({_id : req.user._id})
        if(!buyer){
            let seller = await sellerModel.findOne({_id : req.user._id})
            seller.refreshToken = ""
            seller.save()
            res.status(201).json(200, "user logout successfull")
        }else{
            buyer.refreshToken = ""
            buyer.save()
            res.status(201).json(200, "user logout successfull")
        }
        
    } catch (error) {
        console.log("error in logout controller",error)
        res.status(500).json(apiError(500, "logout failed"))
    }
} 

export { buyerSignup, sellerSignup, login, logout }