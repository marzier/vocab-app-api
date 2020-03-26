const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   const { authorization } = req.headers;

   if (authorization) {
      //console.log("token provided:", authorization);
      jwt.verify(authorization, "asdf", (error, decodedToken) => {
         if (error) {
            return res.status(400).json({error: "You are not authorized"})
         } else {
            req.user = decodedToken;
            next();
         }
      })
   } else {
      console.log("no token");
      return res.status(400).json({error: "No token provided"})
   }
}