var express = require('express');
var router = express.Router();
var User = require('../models/user');
const passport = require('passport');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
function isAuthorized(req,res,next){
  if(req.isAuthenticated()){
    next()
  }
  else{
  return res.status(401).json({message:'Unauthorized Request'});
  }
}

router.post('/register', function (req, res, next) {
  addToDB(req, res);
});


async function addToDB(req, res) {

  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}
router.get('/google/login', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/err' }), (req, res) => {
  req.login(req.session.passport.user,function(err){
    if(err){ return res.status(501).json(err);}
   
        return res.render('redirect.hbs');
      
   
    //return res.status(200).json({message:'Login Successful'});

  });
})

router.post('/login',function(req,res,next){
  passport.authenticate('local', function(err,user,info){
    if (err){ return res.status(501).json(err);}
    if (!user){ return res.status(501).json(info);}
    req.login(user,function(err){
      if(err){ return res.status(501).json(err);}
      return res.status(200).json({message:'Login Successful'});
    });
  })(req,res,next);
});


router.get('/user',isAuthorized,function(req,res,next){
  return res.status(200).json(req.user);
});

router.get('/settings',isAuthorized,function(req,res,next){
  return res.status(200).json(req.user);
});

router.put('/settings',isAuthorized,function(req,res,next){
   updateSettings(req,res)

});

async function updateSettings(req,res){
  
  User.findByIdAndUpdate(req.user._id,req.body).exec().then(result=>{
    return res.status(201).json(result);
  }).catch(err=>{
    return res.status(501).json(err);
  })
}
  

router.get('/logout',isAuthorized,function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Successful'});
});

module.exports = router;
