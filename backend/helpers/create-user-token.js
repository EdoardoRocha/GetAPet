const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
    //create token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.AUTH_SECRET);

    // Return token
    res.status(200).json({
        message: "VocÊ está autenticado",
        token,
        userId: user._id
    })
}


module.exports = createUserToken;