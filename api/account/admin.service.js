const pool = require("../../config/database");




module.exports={
    
    create_admin:(data,callBack)=>{
        pool.query(
            `insert into admin_information (admin_name,admin_email,admin_contact_number,admin_password) value (?,?,?,?)`,
            [//for binding purpose\
                data.admin_name,
                data.admin_email,
                data.admin_contact_number,
                data.admin_password
            ],
            (error,results) =>{
                if(error){
                    callBack(error);
                }
                return callBack(null,results);
            }
        );
    },

    get_admin:callBack=>{
        pool.query(
            `select * from admin_information`,
            [],
            (error,results)=>{
                if(error){
                    callBack(error);
                }
                return callBack(null,results)
            }
        );
    },
    get_admin_by_id:(admin_id,callBack)=>{
        pool.query(
            `select * from admin_information where admin_id = ?`,
            [admin_id],
            (error,results)=>{
                if(error){
                    callBack(error);
                }
                return callBack(null,results[0])
            }
        )
    },
    update_admin:(data,callBack)=>{
        pool.query(
            `update registration set email= ? where id = ?`,
            [
                data.email,
                  data.id
            ],
            (error,results)=>{
                if(error){
                    callBack(error)
                }
                return callBack(null,results)
            }
        )
    },
    delete_admin:(data,callBack)=>{
        pool.query(
          `delete from admin_information where admin_id = ?`,
          [data.admin_id],
          (error,results)=>{
              if(error){
                  callBack(error)
              }
              return callBack(null, results[0])
          }  
        );
        },


        admin_login:(data,callBack)=>{
            pool.query(
                `select * from admin_information where admin_email = ? And admin_password = ?`,
                [
                    data.admin_email,
                    data.admin_password
                ],
                (error,results) =>{
                    if(error){
                        callBack(error);
                    }
                    return callBack(null,results[0]);
                }
            );
        },

        admin_forget_password:(data,callBack)=>{
            pool.query(
                    `select admin_id from admin_information where admin_email = ?`,
                    [
                        data.admin_email
                    ],
                    (error,results)=>{
                        if(error){
                            callBack(error);
                        }
                        return callBack(null,results[0]);
                    }
            );

        },

        admin_update_password:([data,admin_id],callBack)=>{
            pool.query(
                `update admin_information set admin_password= ? where admin_id = `+admin_id,
                [
                    data.admin_password,
                ],
                (error,results)=>{
                    if(error){
                        callBack(error)
                    }
                    return callBack(null,results)
                }
            )
        },

}



