
const express = require("express");
const app = express();
const port = 80;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwtSecret ="Ramissa Rabuja";
const endPoints = require("./endpoints");

//#region SWAGGER

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//#endregion SWAGGER

app.use("/", endPoints);
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.listen(port,() =>{
    console.log("API iniciada com sucesso !");
});

