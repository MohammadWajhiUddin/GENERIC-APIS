const router = require("express").Router();


const {
    create_admin,
    get_admin,
    get_admin_by_id,
    update_admin,
    delete_admin,
    admin_login,
    admin_forget_password,
    admin_update_password
} = require("./admin.controller")


const {check_admin_Token} = require("../../authentication/token_validation")
router.post("/",create_admin);
router.get("/",check_admin_Token,get_admin);
router.get("/:admin_id",check_admin_Token,get_admin_by_id);
router.patch("/",check_admin_Token,update_admin);
router.delete("/",check_admin_Token,delete_admin);
router.post("/login",admin_login);
router.post("/admin_forget_password",admin_forget_password)
router.patch("/admin_update_password/:admin_id",check_admin_Token,admin_update_password)






module.exports = router;