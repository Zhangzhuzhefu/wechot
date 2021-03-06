const {Wechaty, Room} = require('wechaty')
const qr = require('qrcode-terminal')
const chat = require('./processor/chat-processor')
const bot = Wechaty.instance()

bot
.on('scan', (url, code)=>{
    let loginUrl = url.replace('qrcode', 'l')
    qr.generate(loginUrl)
    console.log(url)
})

.on('login', user=>{
    console.log(`${user} login`);
    chat.initialize();
})

.on('friend', async function (contact, request){
    if(request){
        // await request.accept()
        console.log(`Contact: ${contact.name()} send request ${request.hello}`)
    }
})

.on('message', async function(m){
    const contact = m.from()
    const content = m.content()
    const room = m.room()

    console.log('mentioned()' + m.mentioned().toString());
    console.log('type' + m.type());
    console.log('typeSub' + m.typeSub());
    console.log('typeApp' + m.typeApp());
    console.log('typeEx' + m.typeEx());

    if(room){
        console.log(`${contact.name()} @ ${room.topic()} : ${content}`);
    } else{
        console.log(`${contact.name()} : ${content}`);
        if(m.self()){
            chat.perform(m);
            chat.respond(m);
        } else {
        }
    }




    /*if(/hello/.test(content)){
        m.say("hello how are you")
    }

    if(/room/.test(content)){
        let keyroom = await Room.find({topic: "test"})
        if(keyroom){
            await keyroom.add(contact)
            await keyroom.say("welcome!", contact)
        }
    }

    if(/out/.test(content)){
        let keyroom = await Room.find({topic: "test"})
        if(keyroom){
            await keyroom.say("Remove from the room", contact)
            await keyroom.del(contact)
        }
    }*/
})

.start()

