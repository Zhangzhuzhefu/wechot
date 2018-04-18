const db = require('../db/data-store');
var Q = require('q');

var chat = {
    initialize: function () {
        console.log('chat initialize');
        db.initialize();
    },

    respond : function (m) {
        const contact = m.from()
        const content = m.content()

        m.say();
    },

    perform : function (m) {
        const content = m.content().trim();
        console.log("instruction: ", content);

        if (content === '开始工作') {
            Q.nfcall(db.startWork).then(function (data) {
                console.log("startWork: ", data);
                m.say(data['value']);
            }).fail(function (error) {
                console.log('fail:', error);
            });
        }


        if (content === '下班啦') {
            Q.nfcall(db.offWork).then(function (data) {
                console.log("offWork: ", data);
                m.say(data['value']);
            }).fail(function (error) {
                console.log('fail:', error);
            });
        }

        if (content === '在工作吗') {
            console.log('checking if jeff at work');
            Q.nfcall(db.isAtWork).then(function (data) {
                console.log("isAtWork: ", data['value']);
                m.say(data['value']);
            }).fail(function (error) {
                console.log('fail:', error);
            });
        }

        m.say('finished perform');
    }
};

module.exports = chat;