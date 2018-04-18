const db = require('../db/data-store');
const Q = require('q');
const auto = require('../bot/autoreply');

var chat = {
    initialize: function () {
        console.log('chat initialize');
        db.initialize();
    },

    respond : function (m) {
        const contact = m.from();
        const content = m.content();

        if (!/test/.test(content)) return;

        Q.nfcall(db.isAtWork).then(function (data) {
            const isAtWork = data['value'];
            console.log("isAtWork: ", isAtWork);
            if (isAtWork) {
                console.log('auto replying:', auto.JEFF_AT_WORK);
                m.say(auto.JEFF_AT_WORK);
            }
        }).fail(function (error) {
            console.log('fail:', error);
        });
    },

    perform : function (m) {
        const content = m.content().trim();

        if (!/工作啦|下班啦|在工作吗/.test(content)) return;

        console.log("instruction: ", content);

        if (content === '工作啦') {
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
    }
};

module.exports = chat;