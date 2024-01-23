// const jwt = require("jsonwebtoken")

// async function authorize(req, res, next){
//     try{
//         let token = req.header("Authorization")
//         if(!token) {
//             return res.status(400).json({error: "No token  provided"})
//         }
//         console.log(token)
//         token = token.replace("Bearer ", "")


//         const payload = jwt.verify(token, process.env.JWT_SECRET)
//         if (payload.error){
//            return res.status(400).json({error: payload.error})
// }

// req.id = payload.id;
// req.username = payload.username;


// next();
// } catch (err) {
// console.log(err.message);
// res.status(400).json({ error: err.message });
// }
// }

// module.exports = {
// authorize,
//     }

