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
    const entitiesList = [];
    const uris = [];
    request(uriFinal,(err,response,body)=>{
        const entities = JSON.parse(body);
        const name = entities.data.name;
        const id = entities.data.entityId;
        if(id == test){
            res.send(entities);
            for (let i = 1; i <= test; i++) {
                var uriTemp = uri.concat(i);
                uris.push(uriTemp)
                request(uriTemp,(err,response,body)=>{
                const entities2 = JSON.parse(body);
                console.log(entities2);
                });
            }
            console.log(uris);
        } else {
            res.status(400).send(
                jsend(400, {
                    message: "Error en validación datos de entrada",
                })
                );
        }
    });
 

});

app.get('/api/entities/:startId/:endId', (req, res, next) => {
    const start= Number(req.params.startId);
    const end = Number(req.params.endId);
    const uri = "https://f56c0ao48b.execute-api.us-east-1.amazonaws.com/dev/entity/v2.1/entities/";
    const uriFinal = uri.concat(end);
    const entitiesList = [];
    const uris = [];
    request(uriFinal,(err,response,body)=>{
        const entities = JSON.parse(body);
        const id = entities.data.entityId;
        if(id == start){
            res.send(entities);
            for (let i = start; i <= end; i++) {
                var uriTemp = uri.concat(i);
                uris.push(uriTemp)
                request(uriTemp,(err,response,body)=>{
                const entities2 = JSON.parse(body);
                console.log(entities2);
                });
            }
            console.log(uris);
            console.log(end);
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
