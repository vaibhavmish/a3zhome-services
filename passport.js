module.exports=function(Passport, FacebookStrategy, config, mongoose)
{    
    var Customer=new mongoose.Schema({
      profileID:String,
      fullname:String,
      profilePic:String
      }) //to store info about logged in user in db
    
    var customerModel=mongoose.model("Customer",Customer);
    

Passport.serializeUser(function(user,done){
        done(null,user.id);
    })
    Passport.deserializeUser(function(id,done){
    userModel.findbyId(id,function(err,user){
        done(err,user);
    })
    })  

    Passport.use(new FacebookStrategy({
        clientID: config.fb.appID,
        clientSecret: config.fb.appSecret,
        callbackURL: config.fb.callback,
        profileFields:["id","displayname","photos"]
    },
        function(accessToken,refreshToken,profile,done)//done is callback all other params are given by fb
                 {
     user.FindOne({"profileID":profile.id},function(err,result){    
        if(result)
            {
                done(null,result);
            }
        else{
            var newChatUser=new userModel({
                profileID:profile.id,
                fullname:profile.displayName,
                profilePic:profile.photos[0].value||""
            })
            
            newChatUser.save(function(err){
                done(null,newChatUser);
            })
        }
    })
}))
}