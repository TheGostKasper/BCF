module.exports = function (app) {
    var middleware = require(`./../common/middleware.js`)(app);
    var items = require(getUrl('item'))(app)
    var users = require(getUrl('user'))(app)
    var orders = require(getUrl('order'))(app)
    var categories = require(getUrl('categories'))(app)
    var branches = require(getUrl('branch'))(app)
    var types = require(getUrl('type'))(app)
    var registrations = require(getUrl('registration'))(app)


    function getUrl(ctrl) {
        return `./../controllers/${ctrl}/${ctrl}-ctrl.js`;
    }
}