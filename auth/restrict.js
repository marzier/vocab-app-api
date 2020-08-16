const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   const { authorization } = req.headers;

   // console.log("in restrict, res:", res);
   // console.log("in restrict, res body:", res.body);
   // console.log("in restrict, res headers:", res.headers);

   if (authorization) {
      //console.log("token provided:", authorization);
      jwt.verify(authorization, process.env.JWT_SCRET, (error, decodedToken) => {
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


// was 
//       jwt.verify(authorization, "asdf", (error, decodedToken) => {
