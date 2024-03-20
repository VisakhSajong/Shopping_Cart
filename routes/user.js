var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')
const userHelpers = require('../helpers/user-helpers')
var db=require('../config/connection')
var collection = require('../config/collections');


const MyObject = {

}



/* GET home page. */
router.get('/', function(req, res, next) {
  // var userData=db.get().collection(collection.USER_COLLECTION)
  // const user = req.session.user
  // req.session.username = 'vasu';
//   console.log('session', req.session);
//   if (req.session && req.session.user) {
//     const user = req.session.user;
//     res.send(`Hello, ${user.name}!`);
// } else {
//     res.send('User session not found.');
// }

// req.session.username = 'vmv';
// req.session.save()
// const data=MyObject



  productHelpers.getAllProducts().then((products)=>{
    res.render('user/view-products',{products,MyObject});
  })
});

router.get('/login',(req,res)=>{
  res.render('user/login')
})

router.post('/login',(req,res)=>{

  
  // console.log('session', req.session);
    userHelpers.doLogin(req.body).then((response)=>{
    if(response){
    
      MyObject.response=response
      
    
      console.log('session',req.session);
      console.log('obj',MyObject.response.Name);
      // console.log('set',response);
      // if (req.session){
      //   console.log('session initialized');
      // }else{
      //   console.log('session not initialized');
      //   res.status(500).send('Session not initialized');
      // }
  
      // req.session.user=response
      
      // req.session.user = response;
      res.redirect("/")
    }else{
      res.redirect("/login")
    }
  })
})


router.get('/signup',(req,res)=>{
  res.render('user/signup')


  // console.log(req.session);
  // console.log("username",username);
    // res.send('Username from session: ' + username);
})

router.post('/signup',(req,res)=>{
  // console.log(req.body);
  userHelpers.doSignup(req.body).then((response)=>{
    res.send("added")
    console.log("signup",response);
  })

})

router.get('/logout',(req,res)=>{
 req.session.destroy()
 res.redirect('/')
})

module.exports = router;
