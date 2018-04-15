// Protects routes by checking if user is logged in

module.exports = {
    ensureAuthenticated:  (req, res, next) => {
        //Passport function checks session
        if(req.isAuthenticated()) {
            return next();
        }
        
        //Else protect the route
        req.flash('error_msg', 'Not authorized');
        res.redirect('/login');
    }
};