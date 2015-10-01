
module.exports = {

    index: function(req, res, next) {
        var model = res.baseModel;
        model.errors = req.flash('error');
        res.render('index', model);
    },

};

