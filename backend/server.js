const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoConfig = require("./config");
const postsRoutes = require("./routes/postsRoutes");
const commentRoutes = require("./routes/commentRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoute = require('./routes/userRoute')

mongoConfig();

// const authRoutes = require('./routes/authRoutes')
// const userRoutes = require('./routes/userRoutes')
// // middleware
// const { authorize } = require('./middleware/authMiddleware')

const app = express();

const PORT = process.env.PORT; //8080

app.use(cors());
app.use(express.json());

// login point
// app.use('/auth', authRoutes) // not using yet
// add middleware before route, this also grabs req.body/params
// you could also put them inside specific routes inside the routes folder
// app.use('/api/users', authorize, userRoutes)

// [http://localhost:8080/posts]
app.use("/posts", postsRoutes);
// [http://localhost:8080/comments]
app.use("/comments", commentRoutes);

//added by auth-team*******
app.use("/login", authRoutes);

app.use("/user", userRoute);
//****** */

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});

// things to do:
//  + connect to MongoDB
//  + Schema and model for Posts
//  make routes for post/comments
// RESTFUL Routes
//  make routes for user/authentication
//
