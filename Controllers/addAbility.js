const abilities = require("../Models/ability");
const userModel = require("../Models/userModel")


const addAbility = async (req,res) => {
    if(req.user){
        const {ability} = req.query;
        const user = await userModel.findOne({ teamName : req.user.teamName});

        for(let i=0 ; i<abilities.length ; i++){
            if(abilities[i].name === ability){

                userScore = user.score;
                abilityScore = abilities[i].score;

                if(userScore < abilityScore){
                    console.log(userScore)
                    console.log(abilityScore)
                    res.json({message : "Cann't buy this ability , low score!!"});
                }

                else{
                    user.score = userScore - abilityScore
                    user.abilities.push(ability);
                    await user.save();
                    res.json({message : "done"})
                }
                break;
            } 
        }
        // res.json({message : "Ability Not Found"});
    }

    else{
        res.json({message : "UnAuthorized"})
    }
    
}


const getAbility = async (req,res) => {
    if(req.user){
        
        const user = await userModel.findOne({ teamName : req.user.teamName })
        console.log(user.abilities)
        res.json({message : user})
    }
}


module.exports = {addAbility , getAbility}