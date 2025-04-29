const bcrypt = require('bcryptjs');
const DB_User = require('../models/userModel');
const {generateAccessToken , generateRefreshToken} = require('../utils/jwt')
const {loginSchema , signupSchema} = require('../validator/auth.validator')

const signUp = async(req,res) =>{
    try {
        const {username, email, password, companyId, role} = req.body;
        
        const {error} = signupSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                success: false,
                errors: error.details.map(err => err.message)
            });
        }
        //Check if user already exists
        const existUser = await DB_User.findOne({email});
        if(existUser){
            return res.status(400).json({
                success:false,
                message:'Email already exist'
            })
        }
        console.log(existUser);
         // Hash the password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword  = await bcrypt.hash(password,salt);
        console.log(hashedPassword);
        
          // Create User
          const user = await DB_User.create({
            username,
            email,
            password:hashedPassword,
            tempPassword:password,
            companyId,
            role
          })
          console.log(user);
          

          //Generate Tokens
          const accessToken = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user);

          res.status(201).json({
            success:true,
            data:{
                user:{
                    id:user._id,
                    username:user.username,
                    email:user.email,
                    role:user.role
                },
                accessToken,
                refreshToken
            }

          })
    } catch (error) {
        console.error('SignUp error',error)
        
        res.status(500).json({
            success:false,
            message:error.message || 'Something went wrong'
        })
    }
}

const login = async(req,res) =>{
    try {
        const  {email, password} = req.body;

        const {error} = loginSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                success: false,
                errors: error.details.map(err => err.message)
            });
        }
        const user = await DB_User.findOne({email}).select('+password');
        if(!user){
            return res.status(400).json({
                success:false,
                message:'Invalid email or password. try again with valid credentials'
            })
        }

        const validPassword = await bcrypt.compare(
            password , user.password
        )
        if(!validPassword){
            return res.status(400).json({
                success:false,
                message:'Invalid email or password. try again with valid credentials'
            })
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        return res.status(200).json({
            success:true,
            message:'Token generated',
            data:{
                    accessToken,
                    refreshToken
                },
        } )

    } catch (error) {
        console.error('SignUp error',error)
        
        res.status(500).json({
            success:false,
            message:error.message || 'Something went wrong'
        })
    }
    


}

module.exports = {
    signUp,
    login
}