//Express.Router provide endpoints services to our apis
const router = require("express").Router();


const {CREATE_USER,USER_LOGIN,GET_USER_BY_ID,GET_ALL_USERS,USER_UPDATE_INFORMATION,DELETE_USER} = require("./user_detailed_working.controller")

//we utilizes the checkusertoken for our apis, our apis will first check token, if the provided token is valid then apis will be able to work, else it will not perform
const {CHECKUSERTOKEN} = require("../../authentication/token_validation")


//different endpoint
router.post("/create_user",CREATE_USER);
router.post("/user_login",USER_LOGIN)

//if we want to fetch something by passing it in our url then we will utilize api by https:/localhost/mydemoapi/getuserbyid/1    => where 1 defines user id
router.get("/get_user_by_id/:userid",CHECKUSERTOKEN,GET_USER_BY_ID)
router.get("/get_all_users",CHECKUSERTOKEN,GET_ALL_USERS)
router.patch("/update_user/:userid",CHECKUSERTOKEN,USER_UPDATE_INFORMATION)
router.delete("/delete_user",CHECKUSERTOKEN,DELETE_USER);

module.exports = router;