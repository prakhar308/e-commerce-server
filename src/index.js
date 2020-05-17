const express = require("express");
const cookieSession = require("cookie-session")
const passport = require("passport")
const apiRoutes = require("./routes");
const passportSetup = require("./passport/passport-setup") 

const app = express();
const port = process.env.PORT

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use("/api", apiRoutes);

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
})