const express=require("express");
const app=express();
const cors=require("cors")

app.use(express.json())
app.use(cors({
    origin : "*"
}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

var students =[]

app.post("/user-create",function(req,res){
    req.body.id=students.length+1;
    students.push(req.body);

    res.json({
        message : "Student added"
    })
})

app.get("/user-list",function(req,res){
    res.json(students)
})

app.post('/user-edit/:id', function(req, res) {
    var id= parseInt(req.params.id)-1;
    students[id]=req.body;
    students[id].id=id+1

    res.json({
        message : "Student edited"
    })

});

app.get('/user-edit/:id', function(req, res) {
    var id= parseInt(req.params.id)-1;

    res.json(students[id])

});

app.post('/user-delete/:id',function(req, res) {
    var id= parseInt(req.params.id)-1;

    if (id !== undefined) students.splice(id, 1);
    
    res.json({
        message : "Student deleted"
    })

});

app.listen(3000,function(){
    console.log("Server is running")
})
