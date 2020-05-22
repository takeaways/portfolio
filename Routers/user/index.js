const express = require("express");
const router = express();

const userController = require("../../Controllers/user");


router.post("/login", async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const query = {
            email,
            password
        }

        const r = await userController.login({ query })
        res.jsend.success(r)
    } catch (error) {
        next(error)
    }

});



router.post('/', async (req, res, next) => {
    try {

        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;

        const user = {
            email,
            name,
            password
        }

        const r = await userController.postUser({ user })
        res.jsend.success(r);
    } catch (error) {
        next(error)
    }
});


module.exports = router;