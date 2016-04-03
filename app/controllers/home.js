/**
 * Created by truonglee on 19/03/2016.
 */
exports.index = function(req, res) {
    res.render('home/index', {
        title: 'Node Express Mongoose Boilerplate'
    });
};