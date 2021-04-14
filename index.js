const express = require("express");
const app = express();
const port = 80;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
//app.use(express.static("public"));

var DB ={
    games: [
        {
            id: 23,
            title: "Call of Duty",
            year: 2019,
            price: 60
        },
        {
            id: 1,
            title: "Galaga",
            year: 1985,
            price: 10
        },
        {
            id: 4,
            title: "Sea of Thieves",
            year: 2019,
            price: 100
        }
    ]
};

//#region ENDPOINTS

app.get("/games", (req, res) =>{
    res.statusCode = 200;
    res.json(DB.games);
});

app.get("/game/:id", (req, res) =>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);
        if(game == undefined){
            res.sendStatus(404)
        } else {
            res.statusCode = 200;
            res.json(game);
        };
    };
});

app.post("/game", (req, res) =>{
    var {title, year, price} = req.body;
    var id =Math.floor(Math.random() * (1000 - 1) + 1);
    DB.games.push({
        id,
        title,
        year,
        price
    });
    res.sendStatus(200);
});

app.delete("/game/:id", (req, res) =>{
    var id = parseInt(req.params.id);
    var index = DB.games.findIndex(g => g.id == id);
    if(index == -1){
        res.sendStatus(404);
    } else {
        DB.games.splice(index, 1);
        res.sendStatus(200);
    };
});

//#region ENDPOINTS

app.listen(port,() =>{
    console.log("API iniciada com sucesso !");
});
