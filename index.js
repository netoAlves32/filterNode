const express = require('express');
const request = require("request");
const jsend = require('jsend');

// Initialize App
const app = express();


// Assign route
app.use('/api/entities/:entityID', (req, res, next) => {
    const test = Number(req.params.entityID);
    const uri = "https://f56c0ao48b.execute-api.us-east-1.amazonaws.com/dev/entity/v2.1/entities/";
    const uriFinal = uri.concat(test);
    request(uriFinal,(err,response,body)=>{
        const entities = JSON.parse(body);
        const id = entities.data.entityId;
        const name = entities.data.name;
        if(id == test){
            res.send(entities);
        } else {
            res.status(400).send(
                jsend(400, {
                  message: "Error en validación datos de entrada",
                })
              );
        }
    });

});

// Start server on PORT 5000
app.listen(3000, () => {
console.log('Server started!');
});
