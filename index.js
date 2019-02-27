"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const app = express();
const { fallbackHandler, notFoundHandler, genericErrorHandler, poweredByHandler } = require('./handlers.js');
const log_1 = require("../lib/log");
const writeFile_1 = require("../lib/writeFile");
const moveTowardsFood_1 = require("../lib/moveTowardsFood");
const randomMove_1 = require("../lib/randomMove");
app.set('port', (process.env.PORT || 9001));
app.enable('verbose errors');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(poweredByHandler);
app.post('/start', (request, response) => {
    log_1.log('start');
    try {
        writeFile_1.writeFile(request.body, (json) => {
            json.start = request.body;
            json.moves = [];
        });
        // @todo random color
        return response.json({
            color: '#DFFF00',
        });
    }
    catch (e) {
        console.error(e);
    }
});
app.post('/move', (request, response) => {
    log_1.log('move');
    try {
        writeFile_1.writeFile(request.body, (json) => {
            json.moves[request.body.turn] = request.body;
        });
        // log(request.body);
        const directions = ['up', 'down', 'left', 'right'];
        let direction;
        direction = moveTowardsFood_1.moveTowardsFood(request.body);
        if (direction === undefined) {
            direction = randomMove_1.randomMove(request.body);
        }
        return response.json({
            move: directions[direction],
        });
    }
    catch (e) {
        console.error(e);
    }
});
app.post('/end', (request, response) => {
    log_1.log('end');
    return response.json({});
});
app.post('/ping', (request, response) => {
    log_1.log('ping');
    return response.json({});
});
app.use('*', fallbackHandler);
app.use(notFoundHandler);
app.use(genericErrorHandler);
app.listen(app.get('port'), () => {
    console.log('Server listening on port %s', app.get('port'));
});
