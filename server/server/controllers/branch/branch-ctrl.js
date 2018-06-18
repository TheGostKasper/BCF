const Branch = require('./branch-modal');

module.exports = function (app) {
    app.post('/api/branch', (req, res) => {
        // testing 
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addBranchAsync(element).then((data) => { }).catch(err => console.log(err));
            }, this);
        else {
            addBranchAsync(req.body).then((data) => { }).catch(err => console.log(err));
        }
        res.send({ data: req.body, message: "Branch added successfully" })
    });
    app.get('/api/branch', (req, res) => {
        getBranchAsync().then(data => {
            res.send({ data: data, message: "Branch found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.get('/api/branch/:id', (req, res) => {
        getBranchAsync({ _id: req.params.id }).then(data => {
            res.send({ data: data, message: "Branch found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.put('/api/branch/:id', (req, res) => {
        Branch.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, branch) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: branch, message: "Branch updated successfully" })
            }

        });
    });
    app.delete('/api/branch/:id', (req, res) => {
        Branch.findOneAndRemove({ _id: req.params.id }, function (err, branch) {
            if (err) { res.send({ data: null, err: err }); }
            else {
                res.send({ data: branch, message: "Branch removed successfully" })
            }
        });
    })
   
    async function addBranchAsync(branch) {
        return await new Branch(branch).save(function (err, results) {
            if (err) throw err;
            return results;
        });
    }

    async function getBranchAsync(option) {
        return await Branch.find(option).exec();
    }

}