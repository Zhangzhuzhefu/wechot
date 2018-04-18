const Engine = require('tingodb')();
const tingo = new Engine.Db('./tingoDataStore', {});

let collection;

const db = {

    initialize: function () {
        collection = tingo.collection('status.json');
        console.log('collection exists.' + "\n"+ collection.collectionName);

        this.isAtWork(function (error, data) {
            if(!data) {
                console.log('setting isJeffAtWork to false');
                collection.insert({'key':'isJeffAtWork', 'value': false});
            }
        });

        this.isSleeping(function (error, data) {
            if(!data) {
                console.log('setting isJeffSleeping to false');
                collection.insert({'key':'isJeffSleeping', 'value': false});
            }
        });

        collection.findOne({'key': 'autoReply'}, function (error, data) {
            if (!data) {
                console.log('inserting auto-reply: false')
                collection.insert({'key':'autoReply', 'value': false});
            }
        });
    },

    isAutoOn: function (callback) {
        collection.findOne({'key': 'autoReply'}, callback);
    },

    toggleAuto: function (callback) {
        db.isAutoOn(function (error, data) {
           if (data['value']) {
               collection.update({'key':'autoReply'}, {'key':'autoReply', 'value': false}, callback);
           } else {
               collection.update({'key':'autoReply'}, {'key':'autoReply', 'value': true}, callback);
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