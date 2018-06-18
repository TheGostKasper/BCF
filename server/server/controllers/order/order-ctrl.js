const Order = require('./order-modal');
const User = require('./../user/user-modal');
const Item = require('./../item/item-modal');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = function (app) {
    app.post('/api/order', (req, res) => {
        // testing 
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addOrderAsync(element).then((data) => console.log(data)).catch(err => console.log(err));
            }, this);
        else {
            addOrderAsync(req.body).then((data) => console.log(data)).catch(err => console.log(err));
        }
        res.send({ data: req.body, message: "Order added successfully " })
    });
    app.get('/api/order', (req, res) => {
        getOrderAsync({}).then(data => {
            res.send({ data: data, message: "order found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    // aggregate 
    app.post('/api/order/orderItems', (req, res) => {
        getOrderAsync(req.body)
            .then(data => {
                let items = [];
                getOrderItemsAsync(data, (itm) => {
                    return getItemsAsync(itm, (ele) =>
                        Item.findOne({ _id: ele.item_id })
                            .select('_id price image name volume availablility')
                        , (results) => items.push(results))

                }, (results) => res.send({ data: items, message: "Order Items found" }));
            }).catch(err => {
                res.send({ data: null, err: err });
            });
    });
    app.post('/api/order/filterBy', (req, res) => {
        getOrderAsync(req.body)
            .then(data => {
                filterData(data, (ele) =>
                    User.findOne({ _id: ele.user_id })
                        .select('_id name email phone address age')
                    , (results) => res.send({ data: results, message: "Order found" }));
            }).catch(err => {
                res.send({ data: null, err: err });
            });
    });
    app.get('/api/order/:id', (req, res) => {
        getOrderAsync({ _id: req.params.id }).then(data => {
            res.send({ data: data, message: "order found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.put('/api/order/:id', (req, res) => {
        Order.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, order) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: order, message: "order updated successfully" })
            }

        });
    });
    app.delete('/api/order/:id', (req, res) => {
        Order.findOneAndRemove({ _id: req.params.id }, function (err, order) {
            if (err) { res.send({ data: null, err: err }); }
            else {
                res.send({ data: order, message: "order removed successfully" })
            }
        });
    });

    // Items
    app.post('/api/order/item/:id', (req, res) => {
        addSubArray(req.params.id, { items: req.body.items })
            .then((data) =>
                res.send({ data: data, message: "Item added successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.put('/api/order/item/:id', (req, res) => {
        updateSubArray(req.params.id, { items: req.body.items })
            .then((data) =>
                res.send({ data: data, message: "Item updated successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/order/item/:id', (req, res) => {
        delSubArray({ items: { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "Item deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });
    // Payment
    app.post('/api/order/payment/:id', (req, res) => {
        addSubArray(req.params.id, { "extra.payment": req.body.payment })
            .then((data) =>
                res.send({ data: data, message: "payment sent successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/order/payment/:id', (req, res) => {
        delSubArray({ "extra.payment": { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "payment deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });
    // info 
    async function addOrderAsync(order) {
        return await new Order(order).save(function (err, results) {
            if (err) throw err;
            return results;
        });
    }

    async function delSubArray(option) {
        return await Order.update({},
            { $pull: option },
            { multi: true }
        ).exec();
    }
    async function addSubArray(id, option) {
        return await Order.findOneAndUpdate({ _id: id }, {
            $push: option
        }).exec();
    }
    // update sub array
    async function updateSubArray(id, option) {
        return await Order.updateOne(
            {
                "items._id": id
            },
            { $set: { "items.$.created_at": new Date() } }
        ).exec();
    }
    async function getOrderAsync(option) {
        return await Order.find(option).exec();
    }
    async function getOrderItemsAsync(ordItems, fn, callback) {
        let items = [];
        for (let i = 0; i < ordItems.length; i++) {
            await fn(ordItems[i].items).then(data => {
                items.push(data);
                if (i + 1 === ordItems.length) callback(items);
            }).catch(err => console.log(err))
        }
    }
    async function getItemsAsync(ordItems, fn, callback) {
        let items = [];
        // console.log(ordItems);
        for (let i = 0; i < ordItems.length; i++) {
            await fn(ordItems[i]).then(data => {
                items.push(data);
                if (i + 1 === ordItems.length) callback(items);
            }).catch(err => console.log(err))

        }

    }
    async function filterData(arr, fn, callback) {
        let results = [];
        for (let i = 0; i < arr.length; i++) {
            await fn(arr[i]).then(res => {
                results.push({ user: res, order: arr[i] });
                if (i + 1 === arr.length) callback(results);
            });

        }
    }

}