const { Signup, Login  } = require("../controller/AuthController");
const { userVerification } = require("../util/middleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/auth', userVerification);

module.exports = router;