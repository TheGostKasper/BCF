const Category = require('./categories-modal');

module.exports = function (app) {
    app.post('/api/category', (req, res) => {
        // testing 
        if (req.body.length > 1)
            req.body.forEach(function (element) {
                addCategoryAsync(element).then((data) => { }).catch(err => console.log(err));
            }, this);
        else {
            addCategoryAsync(req.body).then((data) => { }).catch(err => console.log(err));
        }
        res.send({ data: req.body, message: "Category added successfully" })
    });
    app.get('/api/category', (req, res) => {
        getCategoryAsync().then(data => {
            res.send({ data: data, message: "Category found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });
    app.get('/api/category/:id', (req, res) => {
        getCategoryAsync({ _id: req.params.id }).then(data => {
            res.send({ data: data, message: "Category found" });
        }).catch(err => {
            res.send({ data: null, err: err });
        });
    });

    app.put('/api/category/:id', (req, res) => {
        Category.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, category) {
            if (err) {
                res.send({ data: null, err: err });
            } else {
                res.send({ data: Category, message: "Category updated successfully" })
            }

        });
    });
    app.delete('/api/category/:id', (req, res) => {
        Category.findOneAndRemove({ _id: req.params.id }, function (err, category) {
            if (err) { res.send({ data: null, err: err }); }
            else {
                res.send({ data: Category, message: "Category removed successfully" })
            }
        });
    })
   
     // Sub-categories
     app.post('/api/category/subCategory/:id', (req, res) => {
        addSubArray(req.params.id, { subCategories: req.body.subCategory })
            .then((data) =>
                res.send({ data: data, message: "Sub-category added successfully" })
            ).catch(err => res.send({ data: null, err: err }));

    });
    app.delete('/api/category/subCategory/:id', (req, res) => {
        delSubArray({ subCategories: { _id: req.params.id } })
            .then((data) =>
                res.send({ data: data, message: "Sub-category deleted successfully" })
            ).catch(err => res.send({ data: null, err: err }));
    });
    async function addCategoryAsync(category) {
        return await new Category(category).save(function (err, results) {
            if (err) throw err;
            return results;
        });
    }

    async function getCategoryAsync(option) {
        return await Category.find(option).exec();
    }
    async function delSubArray(option) {
        return await Category.update({},
            { $pull: option },
            { multi: true }
        ).exec();
    }
    async function addSubArray(id, option) {
        return await Category.findOneAndUpdate({ _id: id }, {
            $push: option
        }).exec();
    }
}