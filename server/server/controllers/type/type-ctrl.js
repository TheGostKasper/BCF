const Type = require('./type-modal');

module.exports = function (app) {
    app.post('/api/type', (req, res) => {
        // testing 
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addTypeAsync(element).then((data) => { }).catch(err => console.log(err));
            }, this);
        else {
            addTypeAsync(req.body).then((data) => { }).catch(err => console.log(err));
        }
        res.send({ data: req.body, message: "Type added successfully" })
    });
    app.get('/api/type', (req, res) => {
        getTypeAsync().then(data => {
            res.send({ data: data, message: "Type found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.get('/api/type/:id', (req, res) => {
        getTypeAsync({ _id: req.params.id }).then(data => {
            res.send({ data: data, message: "Type found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.put('/api/type/:id', (req, res) => {
        Type.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, Type) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: Type, message: "Type updated successfully" })
            }

        });
    });
    app.delete('/api/type/:id', (req, res) => {
        Type.findOneAndRemove({ _id: req.params.id }, function (err, Type) {
            if (err) { res.send({ data: null, err: err }); }
            else {
                res.send({ data: Type, message: "Type removed successfully" })
            }
        });
    })
   
    async function addTypeAsync(type) {
        return await new Type(type).save(function (err, results) {
            if (err) throw err;
            return results;
        });
    }

    async function getTypeAsync(option) {
        return await Type.find(option).exec();
    }

}