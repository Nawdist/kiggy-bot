import fetch from "node-fetch";
import { Client } from 'discord.js';
import token from './env.cjs'

const client = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'], 
    presence:{ 
        activities: [{
            name: "kiggy", type: "WATCHING" 
        }] 
    } 
});


client.on('ready', () => console.log('connected!'))

client.on('messageCreate', async function (msg) {
    console.log("hello")
    if (msg.content.toLowerCase() == "gib kiggy") {
        console.log("yes")
        try {
            const res = await fetch("https://api.thecatapi.com/v1/images/search")
            const data = await res.json()
            msg.channel.send(data[0].url)
        } catch (error) {
            console.log(error);
            msg.channel.send("**Uh oh!** Ran into a " + error.name, ": " + error.message)
        }
    }
})

client.login(token);