import jwt from "jsonwebtoken";

const isLoggedIn = (req, res, next) => {
    if(req.cookies.token === ""){
        res.json({data : "please login"})
    } else {
        let data = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET);
        req.user = data;
        next();
    }
}

export { isLoggedIn };