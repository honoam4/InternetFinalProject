module.exports = function(app) {
    app.use('/api/books', require('./server/api/book'));
};