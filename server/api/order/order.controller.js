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

exports.save = function (req,res) {
    var order = new Order({
        bookId: req.body.bookId,
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

