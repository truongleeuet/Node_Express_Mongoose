/**
 * Created by truonglee on 19/03/2016.
 */
/*
Module dependencies
*/
var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
var Schema = mongoose.Schema;

/*
User Schema
*/

var UserSchema  = new Schema({
    name: {type: String, default: ''},
    email: {type: String, default: ''},
    hashed_password: {type: String, default: ''},
    salt: {type: String, default: ''}
});

/*
User Plugin
*/

UserSchema.plugin(userPlugin, {});


/**
 *Add you
 *-pre-save hooks
 *-validations
 *-virtuals
 */


UserSchema.method({

});

/**
 * Static
 */

UserSchema.static({

});


/**
 *Register
 */
mongoose.model('User', UserSchema);