var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers');

/* GET users listing. */

router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    res.render('admin/view-products',{admin:true,products});
  })
});

router.get('/add-product',function(req,res){
res.render('admin/add-product')
})

router.post('/add-product',(req,res)=>{
  // console.log(req.body);
  // console.log(req.files.Image);
  // res.send('added')
  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/view-products')
        // res.send("Added")
      }else{
        console.log(err);
      }
    })
    
  })
  })

module.exports = router;
