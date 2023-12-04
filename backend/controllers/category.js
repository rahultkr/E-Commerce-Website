const Category = require('./../models/category');

exports.getCategorybyId = (req,res,next,id) => {
    Category.findById(id).exec((err,ctgry) => {
        if(err){
            return res.status(400).json({
                error:'Catgory is not found in DB'
            });
        }
        req.category = ctgry;
        next();
    });
}

exports.createCategory = (req,res) => {
    const category = new Category(req.body);
    category.save((err,ctgry) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save category in DB"
            })
        }
        res.json(ctgry);
    });
}

exports.getCategory = (req,res) => {
    return res.json(req.category);  
}

exports.getAllCategory = (req,res) => {
    Category.find().exec((err,categories) => {
    if(err){
        return res.status(400).json({
            error : "No categories found"
        });
        }
        res.json(categories);
    });
}

exports.updateCategory = (req,res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err,updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Failed to update category"
            });
        }
        res.json(updatedCategory)
    })
}


exports.removeCategory = (req,res) => {
    const category =req.category;

    category.remove((err,updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: 'Failed to delete category'
            });
        }
         res.json({
            mssg:"Successfully deleted"
        });
    });
}