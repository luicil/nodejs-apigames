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

app.get("/", (req, res) =>{

});

app.listen(port,() =>{
    console.log("API iniciada com sucesso !");
});