const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socketManager = require("./server-socket");

// create a new OAuth client used to verify google sign-in
const CLIENT_ID = "939107447896-1b8m9slrq6ri9asd0q9cnq3q2ne7aud1.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

// accepts a login token from the frontend, and verifies that it's legit
function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}


const pfps = [
  "https://i.imgur.com/uGJECfL.png",
  "https://i.imgur.com/wwZFwZQ.png",
  "https://i.imgur.com/U5Vjguq.png",
  "https://i.imgur.com/oEnCoiu.png",
  "https://i.imgur.com/3OsFpFT.png",
  "https://i.imgur.com/a6JsE6X.png",
  "https://i.imgur.com/oXalUsA.png",
  "https://i.imgur.com/tn548yA.png",
  "https://i.imgur.com/n8BK1WB.png",
  "https://i.imgur.com/ZEuE29I.png",
  "https://i.imgur.com/ER6wNiO.png",
  "https://i.imgur.com/v2XWe0y.png",
  "https://i.imgur.com/2RerLmu.png",
]

// gets user from DB, or makes a new account if it doesn't exist yet
function getOrCreateUser(user) {
  // the "sub" field means "subject", which is a unique identifier for each user
  return User.findOne({ googleid: user.sub }).then((existingUser) => {
    if (existingUser) return existingUser;

    const newUser = new User({
      name: user.name,
      googleid: user.sub,
      biscuits: 0,
      bio: "i haven't set my bio yet!",
      pfp: pfps[Math.floor(Math.random()*pfps.length)],
      pics: [],
      favPics: [],
      achievements: [],
      tasksCompleted: 0,
      sessionsCompleted: 0,
      toysBought: [],
      sfxVolume: 100,
      musicVolume: 33,
      notifications: true,
      themesUnlocked: ["cafe",],
      catsSeen: [],
    });

    return newUser.save();
  });
}

function login(req, res) {
  verify(req.body.token)
    .then((user) => getOrCreateUser(user))
    .then((user) => {
      // persist user in the session
      req.session.user = user;
      res.send(user);
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
}

function logout(req, res) {
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
};
