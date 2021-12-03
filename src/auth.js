const express = require('express') 
const router = express.Router()

router.post('/signup',(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please fill all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already Exist"})
        }
        const user = new User({
            email : email,
            password : password,
            results:""
        })
        user.save()
        .then((user)=>{
            const options = {
                from : 'donotreply321@outlook.in',
                to: user.email,
                subject: 'Cowin Notifier',
                text: "Welcome to Cowin Notifier"
            }
            transporter.sendMail(options,(err,info)=>{
                if(err){
                    console.log(err);return;
                }
                console.log("Sent"+" "+info.response)
            })
            res.json({message:"Saved User"})
        })
        .catch((err)=> console.log(err))
    })
    .catch(err=>console.log(err))
})

router.post('/login',(req,res)=>{
    const {email,password,age,pin} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Please fill all the fields"})
        }
        let match = password == savedUser.password
        if(match){
            res.json({message:"SuccessFully logged In",user:savedUser})
        }else{
            return res.status(422).json({error:"Invalid Password"})
        }
    })
    .catch(err=>console.log(err))
})

router.post('/login-check',async(req,res)=>{
    const {age,pin,email} = req.body;
    // runscript(pin,age);
    output = await runscript(pin,age,email);
    res.json("Mail Notifier Enabled");
})


module.exports = router