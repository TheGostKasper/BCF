const User = require('./user-modal');

module.exports = function (app) {
    app.post('/api/user', (req, res) => {
        // testing 
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addUserAsync(element).then((data) => console.log(data)).catch(err => console.log(err));
            }, this);
        else {
            addUserAsync(req.body).then((data) => console.log(data)).catch(err => console.log(err));
        }
        res.send({ data: req.body, message: "User added successfully" })
    });
    app.get('/api/user', (req, res) => {
        User.find({}, (err, Users) => {
            if (err) res.json({ data: null, message: JSON.stringify(err) });
            else res.json({ data: Users, message: "200" });
        });
    });
    app.get('/api/user/:id', (req, res) => {
        getUserAsync({ _id: req.params.id }).then(data => {
            res.send({ data: data, message: "User found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.put('/api/user/:id', (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, User) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: User, message: "User updated successfully" })
            }

        });
    });

    // Transactions 
    app.post('/api/user/transactions/:id', (req, res) => {
        addSubArray(req.params.id, { "extra.transactions": req.body.transactions })
            .then((data) =>
                res.send({ data: data, message: "Transactions sent successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/user/transactions/:id', (req, res) => {
        delSubArray({ "extra.transactions": { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "Transactions deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });



    // info 
    async function addUserAsync(user) {
        console.log(user);
        return await new User(user).save((err, results) => {
            if (err) throw err;
            else return results;
        });
    }

    async function delSubArray(option) {
        return await User.update({},
            { $pull: option },
            { multi: true }
        ).exec();
    }
    async function addSubArray(id, option) {
        return await User.findOneAndUpdate({ _id: id }, {
            $push: option
        }).exec();
    }

    async function getUserAsync(option) {
        return await User.find(option).exec();
    }

}