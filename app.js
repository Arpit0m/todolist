const bodyParser = require('body-parser');

const express = require('express');

const app = express();

const date = require(__dirname +"/date.js");

const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/todolistDB");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


const itemSchema = new mongoose.Schema({
    name : String
});




const Item = mongoose.model("Item", itemSchema);

const def1 = new Item({
    name : "Your to do list"
});

const def2 = new Item({
    name : " + to add"
});

const def3 = new Item({
    name : "click checkbox to delete"
});


const defItems = [def1,def2,def3];






app.get("/",function(req,res){
    

   let day = date.getDate();   

   Item.find({}, function(err, foundItem){
    
    if (foundItem.length === 0) {
        Item.insertMany(defItems, function(err ,item){
            if(err)
            {
                console.log(err);
            }
            else{
                console.log("done");
            }

            res.redirect("/");
        })
                
    } else {

        res.render("list",{
            listTitle : day, newListItems : foundItem});
    }


   
   })
 
})




app.post("/delete" ,function (req, res) {
    const checkedID = req.body.checkbox;
    Item.findByIdAndDelete(checkedID ,function(err){
        if(!err)
        {
            console.log("deleted" + checkedID);
            res.redirect("/");
        }
    })
})
app.post("/",function(req, res){

    const itemName = req.body.newItem;

    const item = new Item({
        name : itemName,
    });

    item.save();
    res.redirect("/");   
                
})


app.get("/:customList",function(req,res){

    const customListName = req.params.customList;
    List.findOne({ list : customListName},function(err ,found){
        if(!err){
            if(!found){
                
                  

                     const list = new List({
                             list : customListName,
                             item : defItems,
                             })
                                 list.save();
                                 res.redirect("/"+customListName);

            }
            else
            {   
                res.render("list",{
                    listTitle : customListName, newListItems : defItems});

            }
        }

     })


    
        
    
      
        
    
   


  


    
});

const listSchema = new mongoose.Schema({
    list : String,
    item : [itemSchema],
});

const List =  mongoose.model("List",listSchema);















app.listen(3000,function(){
    console.log("server up ....");
});