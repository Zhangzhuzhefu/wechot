const db = require('../db/data-store');
const Q = require('q');
const auto = require('../bot/autoreply');
const ins = require('../bot/instruction');

var chat = {
    initialize: function () {
        console.log('chat initialize');
        db.initialize();
    },

    respond : function (m) {
        const contact = m.from();
        const content = m.content();

        Q.nfcall(db.isAtWork).then(function (data) {
            const isAtWork = data['value'];
            console.log("isAtWork: ", isAtWork);
            if (isAtWork) {
                console.log('auto replying:');
                m.say(auto.JEFF_AT_WORK);
            } else {
                Q.nfcall(db.isSleeping).then(function (data) {
                    const isSleeping = data['value'];
                    console.log("isSleeping: ", isSleeping);
                    if (isSleeping) {
                        console.log('auto replying:');
                        m.say(auto.JEFF_IS_SLEEPING);
                    }
                }).fail(function (error) {
                    console.log('fail:', error);
                });
            }
        }).fail(function (error) {
            console.log('fail:', error);
        });


    },

    perform : function (m) {
        const content = m.content().trim();

        if (![ins.HELP, ins.IS_AT_WORK, ins.START_WORK, ins.OFF_WORK,
                ins.IS_SLEEPING, ins.GO_TO_BED, ins.WAKE_UP].includes(content)) return;

        console.log("instruction: ", content);

        if (content.toLowerCase() === ins.HELP) {
            m.say(JSON.stringify(ins));
        } else if (content === ins.START_WORK) {
            Q.nfcall(db.startWork).then(function (data) {
                console.log("startWork: ", data);
                m.say(JSON.stringify(data));
            }).fail(function (error) {
                console.log('fail:', error);
            });
        } else if (content === ins.OFF_WORK) {
            Q.nfcall(db.offWork).then(function (data) {
                console.log("offWork: ", data);
                m.say(JSON.stringify(data));
            }).fail(function (error) {
                console.log('fail:', error);
            });
        } else if (content === ins.IS_AT_WORK) {
            console.log('checking if jeff at work');
            Q.nfcall(db.isAtWork).then(function (data) {
                console.log("isAtWork: ", data['value']);
                m.say(String(data['value']));
            }).fail(function (error) {
                console.log('fail:', error);
            });
        } else if (content === ins.GO_TO_BED) {
            Q.nfcall(db.goToBed).then(function (data) {
                console.log("goToBed: ", data);
                m.say(JSON.stringify(data));
            }).fail(function (error) {
                console.log('fail:', error);
            });
        } else if (content === ins.WAKE_UP) {
            Q.nfcall(db.wakeUp).then(function (data) {
                console.log("wakeUp: ", data);
                m.say(JSON.stringify(data));
            }).fail(function (error) {
                console.log('fail:', error);
            });
        } else if (content === ins.IS_SLEEPING) {
            console.log('checking if jeff is sleeping');
            Q.nfcall(db.isSleeping).then(function (data) {
                console.log("isSleeping: ", data['value']);
                m.say(String(data['value']));
            }).fail(function (error) {
                console.log('fail:', error);
            });
        }
    }
};

module.exports = chat;