module.exports = function(app) {
    app.use('/api/books', require('./server/api/book'));
    app.use('/api/orders', require('./server/api/order'));
};