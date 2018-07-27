const _ = require('underscore');
const R = require('ramda');
const mongoose = require('mongoose');
const imageModel = mongoose.model('imageModel');


module.exports = app => {

    app.get('/', (req, res) => {
        res.send('hello');
    });

    app.post('/api/upload/', (req, res) => {
        if (req.body) {
            const parsedData = req.body;
            //console.log(parsedData)
            if (parsedData.data && parsedData.data.length > 0) {
                _.each(parsedData.data, obj => {
                    const imageData = new imageModel;
                    imageData.category_name = obj.category_name;
                    imageData.description = obj.description;
                    imageData.imageURL = obj.imageURL;
                    imageData.name = obj.name;
                    imageData.save()
                        .then(imageData => {
                            console.log('saved in mongo');
                        })
                });
                res.send('success');
            }
        }
        else {
            res.send('error!!');
        }
    });

    app.get('/api/categories/:expression', (req, res) => {
        if (req.params && req.params.expression) {
            let expressionObj = JSON.parse(req.params.expression);
            expressionObj.key = R.toLower(expressionObj.key);
            //console.log(expressionObj.key);
            return imageModel.find({
                'category_name': { $regex: expressionObj.key}
            }).exec()
                .then(existing => {
                    res.send(existing);
                })
        } else {
            res.send('enter the key to search for');
        }
    })
}

