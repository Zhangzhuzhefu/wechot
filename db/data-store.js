const Engine = require('tingodb')();
const tingo = new Engine.Db('./tingoDataStore', {});

var collection;

const db = {

    initialize: function () {
        collection = tingo.collection('status.json');
        console.log('collection exists.' + "\n"+ collection.collectionName);

        this.isAtWork(function (error, data) {
            if(!data) {
                console.log('setting isJeffAtWork to false');
                const collection = tingo.collection('status.json');
                collection.insert({'key':'isJeffAtWork', 'value': false});
            }
        });

        this.isSleeping(function (error, data) {
            if(!data) {
                console.log('setting isJeffSleeping to false');
                const collection = tingo.collection('status.json');
                collection.insert({'key':'isJeffSleeping', 'value': false});
            }
        });
    },

    isAtWork : function (callback) {
        collection.findOne({'key':'isJeffAtWork'}, callback);
    },

    startWork : function (callback) {
        collection.update({'key':'isJeffAtWork'}, {'key':'isJeffAtWork', 'value': true}, callback);
    },

    offWork : function (callback) {
        collection.update({'key':'isJeffAtWork'}, {'key':'isJeffAtWork', 'value': false}, callback);
    },

    isSleeping : function (callback) {
        collection.findOne({'key':'isJeffSleeping'}, callback);
    },

    goToBed : function (callback) {
        collection.update({'key':'isJeffSleeping'}, {'key':'isJeffSleeping', 'value': true}, callback);
    },

    wakeUp : function (callback) {
        collection.update({'key':'isJeffSleeping'}, {'key':'isJeffSleeping', 'value': false}, callback);
    }


};

module.exports = db;