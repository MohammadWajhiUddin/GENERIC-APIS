

//accessing all functions which we have defined inside user_detailed_working.service
const {CREATE_USER,USER_LOGIN,GET_USER_BY_ID,GET_ALL_USERS,USER_UPDATE_INFORMATION,DELETE_USER} = require("./user_detailed_working.service");


//bcrypt is a library utilized for encryption and decrytion purpose,
//genSaltSync is utilized for adding salt and then padding salt with the data which we want to get encrypt EX=> pass= 12221sa, salt = 12sws412//1 , result = >12221sa12sws412//1 
//
//hashsync is used for hasing our data which we recieved after adding salt to it it will provide encrypted password => hash(pass+salt)=>hash(12221sa12sws412//1) => 1jasdkjjkh1j2hhh213mnas@
//compare will be utilized for comparing result of our password and the stored encrypted password
const {genSaltSync,hashSync,compareSync} = require("bcrypt")

//jsonwebtoken is a library for providing authentication token for apis, through this token Server will be capable of knowing that the auther is authentic
//it signs token with the different variable 
// in this example we utilized useremail and password and then padding that with our personal data.
const {sign} =  require("jsonwebtoken")



module.exports={

    CREATE_USER:(req,res)=>{
       const salt = genSaltSync(10);
       const body = req.body;
       const hash = hashSync(body.userpassword, salt);

       body.userpassword = hash
     
        CREATE_USER(body,(err,results)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    message: "Database Connection Error",
                });
            }
            return res.status(200).json({
                success:1,
                data:results
            });
        })
    },
   
    USER_LOGIN:(req,res)=>{
        const body = req.body;

       USER_LOGIN(body.useremail,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message: "Database Connection Error",
                });
            }
            if(!results){
                console.log(err)
                return res.json({
                    success:0,
                    message: "Invalid Email Or Password",
                });
            }
            const result = compareSync(body.userpassword, results.userpassword);
            
            if(result)
            {
                results.password = undefined;
                const jsontoken = sign({result:results.useremail+results.userpassword},"MYSTORY_PREFERS_MORE_THEN_YOURS",{expiresIn:"1h"});
                return res.status(200).json({
                    success:1,
                    message: "Successfully Login",
                    data:results,
                    token:jsontoken
                });

            }else {
                return res.json({
                  success: 0,
                  data: "Invalid email or password"
                });
              }
           
          
        })
    },


    GET_USER_BY_ID:(req,res)=>{
        const userid = req.params.userid;
        GET_USER_BY_ID(userid,(err,results)=>{
            if(err){
               return
            }
            if(!results){
                return res.status(500).json({
                    success:0,
                    message:"No Record Found"
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },



    GET_ALL_USERS:(req,res)=>{
        GET_ALL_USERS((err,results)=>{
            if(err){
                return res.json({
                    status:0,
                    message:"Error in connection"
                });
            }
            return res.json({
                status:1,
                message:results
            })
        })
    },


    USER_UPDATE_INFORMATION:(req,res)=>{
        const salt = genSaltSync(10);
        const body = req.body;
        const hash = hashSync(body.userpassword, salt);
        body.userpassword = hash
        const userid = req.params.userid;
        USER_UPDATE_INFORMATION([body,userid],(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message: "Database Connection Error",
                });
            }
            if(!results){
                console.log(err)
                return res.json({
                    success:0,
                    message: "Invalid User Id ",
                });
            }
            return res.status(200).json({
                success:1,
                message: "Valid User ID, User Successfully Updated",
                data:results,

            });
        })
    },

   
    DELETE_USER:(req,res)=>{
        const data = req.body;
        DELETE_USER(data,(err,results)=>{
           if(err){
            return res.status(500).json({
                success:0,
                message: "Database Connection Error",
            });            
            }
            if(!results){
                return res.json({
                    status:0,
                    message:"Record Not Found"
                });
            }
            return res.status(200).json({
                success:1,
                message:"User Deleted Successfully"
            })
           });
       },

      
      

   

    


   
}