const router = require("express").Router();

/***************************************
 *  BACKEND SERVER SIDE RENDERING      *
 *              Router                 *
 ***************************************/

router.get("/", (req, res)=>{
    res.render("test")
})

module.exports = router;