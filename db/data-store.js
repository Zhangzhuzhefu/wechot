const Engine = require('tingodb')();
const tingo = new Engine.Db('./tingoDataStore', {});

var collection;

const db = {

    initialize: function () {
        collection = tingo.collection('status.json');
        console.log('collection status.json exists.' + "\n"+ collection.collectionName);

        this.startWork(function (error, data) {
            console.log("startWork");
            console.log("error: " + error, "data: "+JSON.stringify(data));
        });


        this.isAtWork(function (error, data) {
            console.log("isAtWork");
            console.log("error: " + error, "data: "+JSON.stringify(data));
            if(!data) {
                console.log('setting isJeffAtWork to false');
                const collection = tingo.collection('status.json');
                collection.insert({'key':'isJeffAtWork', 'value': false});
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
    }


};

module.exports = db;