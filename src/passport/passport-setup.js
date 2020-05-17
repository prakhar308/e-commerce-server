const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../models/");

passport.serializeUser(async (user, done) => {
   done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await db.User.findById(id);
		done(null, user);
	} catch(e) {
		console.log(e);
	}
});

passport.use(new GoogleStrategy({
		// options for google strategy
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: "http://localhost:3000/api/auth/google/redirect"
	},
	async (accessToken, refreshToken, profile, done) => {
		try {
			// check if user already exists
			const currentUser = await db.User.findOne({googleId: profile.id});
			if(currentUser){
				done(null, currentUser)
			}
			// if not create new
			else {
				console.log("user not found")
				const newUser = new db.User({
					name: profile._json.name,
					email: profile._json.email,
					googleId: profile.id
				})
				await newUser.save();
				console.log(newUser)
				done(null, newUser);
			}
		} catch(e) {
			// statements
			console.log(e);
		}
	}
));