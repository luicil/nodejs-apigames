const express = require("express");
const router = express.Router();
const DB = require("./DB");

//#region ENDPOINTS

router.get("/games", auth, (req, res) =>{
    res.statusCode = 200;
    res.json(DB.games);
});

router.get("/game/:id", (req, res) =>{
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

router.post("/game", (req, res) =>{
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

router.delete("/game/:id", (req, res) =>{
    var id = parseInt(req.params.id);
    var index = DB.games.findIndex(g => g.id == id);
    if(index == -1){
        res.sendStatus(404);
    } else {
        DB.games.splice(index, 1);
        res.sendStatus(200);
    };
});

router.put("/game/:id", (req, res) =>{
    var id = parseInt(req.params.id);
    var game = DB.games.find(g => g.id == id);
    if(game == undefined){
        res.sendStatus(404);
    } else {
        var {title, year, price} = req.body;
        if(title != undefined){
            game.title = title;
        };
        if(year != undefined){
            game.year = year;
        };
        if(price != undefined){
            game.price = price;
        };
        res.sendStatus(200);

    }
});

router.post("/auth", (req, res) =>{
    var {email, senha} = req.body;
    var user = DB.users.find(u => u.email == email);
    if(user == undefined){
        res.status(404);
    } else {
        if(user.senha == senha){
            jwt.sign({id: user.id, email: user.email}, jwtSecret, {expiresIn: "1h"},(err, token) =>{
                if(err){
                    res.status(401);
                    res.json({err: err});

                } else {
                    res.status(200);
                    res.json({token: token});        
                };                
            });            
        } else {
            res.status(401);
            res.json({err: "Não autorizado"});
        }
    }
});

function auth(req, res, next){
    var token = req.headers["authorization"];
    console.log(token);
    if(token != undefined){
        const bearer = token.split(" ");
        token = bearer[1];
        jwt.verify(token, jwtSecret, (err, data) =>{
            if(err){
                res.status(401);
                res.json({err: "Não autorizado"});        
            } else {
                console.log(data);
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email}
                next();
            };
        });

    } else {
        res.status(401);
        res.json({err: "Não autorizado"});
    } 
};

module.exports = router;

//#region ENDPOINTS
