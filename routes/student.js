const express = require("express");
const router = express.Router();
const studentSchema = require("../models/students");

router.post('/createNewStudent', function(req, res){
    console.log(req.body);
    const studentsData = new studentSchema(req.body);
    studentsData.save(function(err){
        if(err) {
            console.log("Error occurred", err);
        } else {
            console.log("Data saved successfully");
            res.send("student entry added successfully");
        }
    });
});

router.get("/", function(req, res){
     studentSchema.find({}, { _id: 0, __v: 0 }, function(err, data){
          if(err) {
              console.log("Log of err", err);
          }else {
              res.send({"results": data});
          }
     });
});

router.get("/:id", function(req, res){
    studentSchema.find({id: req.params.id}, { _id: 0, __v: 0 }, function(err, data){
         if(err) {
             console.log("Log of err", err);
         }else {
             res.send({"results": data});
         }
    });
});

router.put("/:id", function(req, res){
    studentSchema.findOneAndUpdate(
        { id: req.params.id },
        { grade: req.body.grade },
        {
             new: true, //return update doc
             runValidators: true, //validate before update
        },
        function(err){
            if(err) {
                console.log(err);
            } else {
                res.send("Student details updated successfully");
            }
        }
    );
});

router.delete('/:id', function(req, res){
        studentSchema.findOneAndRemove({ id: req.params.id },function(err){
            if(err) {
                console.log(err);
            } else {
                res.send("Data deleted successfully");
            }
        });
});

router.delete('/deleteAllStudent', function(req, res){
    console.log(req.body);
    studentSchema.deleteMany({},function(err){
        if(err) {
            console.log(err);
        } else {
            res.send("All Data deleted successfully");
        }
    });
});

router.get("/", function(req, res){
      console.log(req.query.name);
      var search = req.query.name;
      let partialToMatch = new RegExp(search,'i');
        console.log(search);
            studentSchema.find({title : partialToMatch}, { _id: 0, __v: 0 }, function(err, data){
        if(err) {
            console.log("Log of err", err);
        }else {
            res.send({"results": data});
        }
   });
});

module.exports = router;