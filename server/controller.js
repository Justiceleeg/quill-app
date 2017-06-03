var app = require('./index');
const db = app.get('db')
module.exports = {

  getProductsByType: function(req, res){
    const typeId = +req.params.typeId;

    db.getProductsByType([typeId],function(err, products){
        return res.status(200).json(products);
    })
  }

}
