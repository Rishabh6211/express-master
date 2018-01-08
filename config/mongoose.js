import mongoose from 'mongoose';
import Promise from 'bluebird';
mongoose.Promise = global.Promise;
const promisify = Promise.promisify;

const log = require('./log')(module);
const connections = require('./connections');

mongoose.connection.openUri('mongodb://rishabh:rishabh@ds247047.mlab.com:47047/fitnessapi').then(() => {
    log.info('Connected to DB!');
}).catch((error) => {
    log.error(error);
});

