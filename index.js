import fetch from "node-fetch";
import { Client } from 'discord.js';
import token from './env.cjs'
// import { RedditPost } from "./indexd.js";
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
    let matches = msg.content.toLowerCase().match(/(gib|(give?)) +((smol +)?((kiggy)|(loaf)))/i)
    if (matches && matches.length > 0) {
        console.log("yes")
        let content = msg.content.toLowerCase();
        let res;
        try {
            if(content.includes("smol")) res = await fetch("https://www.reddit.com/r/illegallysmolcats.json")
            else if (content.includes("loaf")) res = await fetch("https://www.reddit.com/r/catloaf.json")
            let data = res && await res.json()
            const posts = data.data.children.filter(({data}) => data.url.endsWith(".jpg") || data.url.endsWith(".png"))
            const post = posts[rand(0, posts.length)]

            if (data) return msg.channel.send(post.data.url)
            res = await fetch("https://api.thecatapi.com/v1/images/search")
            data ||= await res.json()
            msg.channel.send(data[0].url)
        } catch (error) {
            console.log(error);
            msg.channel.send("**Uh oh!** Ran into a " + error.name + ": " + error.message)
        }
    }
});
const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)
client.login(token);