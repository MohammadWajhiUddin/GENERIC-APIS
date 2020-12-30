
// requiring database details which are described  inside config file, and storing that details inside pool variable
const pool = require("../../config/database");



//module.exports will export every callback or functions which we described within this
module.exports={
    //creating user
    CREATE_USER:(data,callBack)=>{
        pool.query(
            `insert into users (username,userphonenumber,useremail,userpassword) value (?,?,?,?)`,
            [//for binding purpose\
                data.username,
                data.userphonenumber,
                data.useremail,
                data.userpassword,
            ],
            (error,results) =>{
                if(error){
                    callBack(error);
                }
                return callBack(null,results);
            }
        );
    },

    USER_LOGIN:(useremail,callBack)=>{
        pool.query(
            `select * from users where useremail = ?`,
            [
                useremail,
            ],
            (error,results) =>{
                if(error){
                    callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },


    GET_USER_BY_ID:(userid,callBack)=>{
        pool.query(
            `select * from users where userid = ?`,
            [userid],
            (error,results)=>{
                if(error){
                    callBack(error);
                }
                return callBack(null,results[0])
            }
        )
    },

    GET_ALL_USERS:callBack=>{
        pool.query(
            `select * from users`,
            [],
            (error,results)=>{
                if(error){
                    callBack(error);
                }
                return callBack(null,results)
            }
        );
    },


 
    USER_UPDATE_INFORMATION:([data,userid],callBack)=>{
        pool.query(
            `update users SET username= ? , userphonenumber = ? , useremail = ? , userpassword = ? where userid = `+userid,
            [
                data.username,
                data.userphonenumber,
                data.useremail,
                data.userpassword
            ],
            (error,results)=>{
                if(error){
                    callBack(error)
                }
                return callBack(null,results)
            }
        )
    },

    DELETE_USER:(data,callBack)=>{
        pool.query(
          `delete from users where userid = ?`,
          [data.userid],
          (error,results) =>{
            if(error){
                callBack(error);
            }
            return callBack(null,results[0]);
        }
        );
        },
   


      


}



