var Order = require('./order.model');

exports.index = function(req, res) {
    Order.find({}, function(err, orders) {
        if (err) {
            return res.status(500).end();
        }

        res.json(orders);
    });
};

exports.getById = function(req, res) {
    Order.findById({"_id": req.params.id}, function(err, order) {
        if (err) {
            return res.status(500).end();
        }

        res.json(order);
    });
};

exports.byMonth = function(req, res) {
    var group = {
        key: {"date" : 1},
        cond: {},
        reduce: function(doc, out) {
            out.count++;
        },
        initial: {
            count: 0
        },
        finalize: function(out) {
        }
    };

    Order.collection.group(group.key, group.cond, group.initial, group.reduce, group.finalize, true, function(err, results) {
        var oderCounts = [];
        results.forEach(function (order){
            oderCounts.push({"x": order.date.getMonth() + 1 + "-" + order.date.getFullYear(), "y" : order.count});
        });

        res.json(oderCounts);
    });
};

exports.byBooks = function(req, res) {
    var group = {
        key: {"bookId" : 1},
        cond: {},
        reduce: function(doc, out) {
            out.count++;
        },
        initial: {
            count: 0
        },
        finalize: function(out) {
        }
    };

    Order.collection.group(group.key, group.cond, group.initial, group.reduce, group.finalize, true, function(err, results) {
        var oderCounts = [];
        results.forEach(function (order){
            oderCounts.push({"bookId": order.bookId, "ordersCount" : order.count});
        });

        res.json(oderCounts);
    });
};

exports.save = function (req,res) {
    var order = new Order({
        bookId: req.body.bookId,
        bookName: req.body.bookName,
        customerId : 1,
        date: new Date()
    });

    order.save(function(err, order) {
        if (!err) {
            return res.send("order saved");
        } else {
            console.log(err);
            return res.send(404, { error: "order was not saved." });
        }
    });
};

exports.search = function(req, res) {
    // Book name Text
    var searchText = '';
    if (req.params.bookName){searchText = req.params.bookName};

    // Customers
    var customers = req.params.customers.split(',');
    var chosenCustomers = JSON.parse(JSON.stringify(customers));

    // Dates
    var minDate = new Date(req.params.minDate);
    var maxDate = new Date(req.params.maxDate);

    Order.find({
        "bookName": new RegExp(searchText, "i"),
        "date": { $lte: maxDate, $gte: minDate },
        "customerId": { $in: chosenCustomers }
        },
        function(err, orders) {
        if (err) {
            return res.status(500).end();
        }
        res.json(orders);
    });
};

