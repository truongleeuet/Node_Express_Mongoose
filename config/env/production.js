
/**
 * Created by truonglee on 19/03/2016.
 */
module.exports = {
    db: 'mongodb://localhost/your_project_production',
    facebook: {
        clientID: 'APP_ID',
        clientSecret: 'SECRET',
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        scope: [
            'email',
            'user_about_me',
            'user_friends'
        ]
    },

    google: {
        clientID: 'APP_ID',
        clientSecret: 'SECRET',
        callback: 'http://localhost:3000/auth/google/callback',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/m8/feeds'
        ]
    }
};