import passport from 'passport'
import { Strategy } from 'passport-google-oauth20';
import { UserController } from './user.controller';
import { v4 as uuidv4 } from 'uuid';
import { SessionController } from './session.controller';

const userController = new UserController();
const sessionController = new SessionController();
// Set up Google OAuth strategy
passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: "https://c8f9e2ecb687.ngrok-free.app/api/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
     
    // Check if the profile has an email
    if (!profile.emails || profile.emails.length === 0)
      return cb(new Error('No email found in Google profile'), undefined);
    // Check if the email exists in the database
    const user = await userController.getUserByEmail(profile.emails[0].value);    
    
    // If user does not exist, create a new user
    if (!user || !user.id) {
      const newUser = {
        email: profile.emails[0].value,
        display_name: profile.displayName || '',
        first_name: profile.name?.givenName || '',
        last_name: profile.name?.familyName || '',
        username: `${profile.displayName || ''}_${uuidv4().slice(0, 8)}`,
        profile_pic: profile.photos ? profile.photos[0].value : '1752016295786_logo.png',
        location: ['', ''],
      };
      const userSession = await userController.createGoogleUser(newUser);
      return cb(null, {userExists : false, ...userSession});
    }

    // If user exists, check if they have an active session
    const userSession = await sessionController.getSessionByUserId(user.id);
    // If no session exists, create a new session
    if (!userSession) {
      const newSession = await sessionController.createSession(sessionController.generateSessionToken(), user.id);
      return cb(null, {userExists : true, ...newSession});
    }

    return cb(null, {userExists : true, ...userSession});
  }
));

// Export google authentication middleware
export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Callback route for Google authentication
// This is where Google redirects after successful authentication
export const googleAuthCallback = [
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req: any, res: any) => {
        // Successful authentication
        res.redirect(`Athletix://redirect?token=${req.user.token}&userExists=${req.user.userExists}&user_id=${req.user.user_id}`);
    }
];