import { TTY, Color } from "./tty";
import * as Vue from "vue/dist/vue.common.js";
import { PROFILE_TEMPLATE } from "./templates";
import 'whatwg-fetch'

/**
 * Load scripts at runtime
 * @param url 
 */
const loadScript = (url) => {
    const scriptElement = document.createElement("script");
    scriptElement.src = url;
    document.head.appendChild(scriptElement);
}

/**
 * Load stylesheets at runtime
 * @param url 
*/
const loadStyle = (url) => {
    const linkElement = document.createElement('link'); 
    linkElement.rel = 'stylesheet';
    linkElement.href = url;
    document.head.appendChild(linkElement);
}

document.addEventListener("DOMContentLoaded", async () => {
    const tty = new TTY(document.querySelector("#stdout"));

    /** Preload powermode */
    loadScript('./dist/activePowerMode.js'); 
    
 
    await tty.write("Hey there!");
    await tty.idle(1000);
    await tty.lineBreak();

    await tty.write("Mhh, this website seems unfinished at the moment. Let's update it");
    await tty.segment("...", 300);    
    await tty.eraseLine(10);

    await tty.writeLine("Let's start by writing some CSS");
    await tty.code("#stdout { background: #000; display: flex; color: #fff; }", "css", { typeSpeed: 30 });
    document.body.classList.add("segment-1");
    await tty.idle(1000);

    await tty.writeLine("Cool. Let's continue");
    await tty.idle(1000);
    await tty.code("#stdout .tty-block-code { margin: 10px 0; }", "css", { typeSpeed: 30 });
    document.body.classList.add("segment-2");
    await tty.idle(1000);

    await tty.writeLine("Mhh, let's style the code a bit further");
    await tty.idle(500);
    await tty.code("#stdout .tty-block-code { padding: 15px 20px; background: #222; }", "css");
    document.body.classList.add("segment-3");

    await tty.idle(500);
    await tty.writeLine("Let's enable syntax highlighting. Otherwise it's really hard to read.", { typeSpeed: 30 });
    await tty.code("const prismStyle = document.createElement('link'); prismStyle.rel = 'stylesheet'; prismStyle.href = './prism.css'; document.head.appendChild(prismStyle)", "js",  { typeSpeed: 10 });
    await tty.code("const prismScript = document.createElement('script'); prismScript.src = './prism.js'; document.head.appendChild(prismScript)", "js",  { typeSpeed: 10 });
    loadStyle('./dist/prism.css'); 
    loadScript('./dist/prism.js');
    await tty.idle(300);

    await tty.writeLine("Alright. I think we're good to go.");
    await tty.idle(300);
    await tty.writeLine("Let me tell you something about me, that's why you are here right?");
    await tty.idle(1000);

    // On tablet and above we move the terminal to the right
    if (window.innerWidth > 767){
        await tty.writeLine("Let's move this window to the right so we have more space.");
        await tty.code("#stdout { max-width: 50%; }", "css");
        await tty.code("const profileEl = document.querySelector('#profile'); profileEl.classList.remove('hidden');", "js");
    }
    
    // This actually achieves the moving to the right
    document.body.classList.add("segment-4");
    const profileEl = document.querySelector('#profile'); 
    profileEl.classList.remove('hidden');

    await tty.idle(200);
    await tty.writeLine("Let's load some data about me.");
    await tty.code("const req = await fetch('info.json'); const profilePayload = await req.json()", "js");
    await tty.idle(200);

    const req = await fetch('/dist/info.json'); // TODO: Fetch for a JSON payload with 2 fixed keys?
    const profilePayload = await req.json();

    await tty.idle(300);
    await tty.writeLine("So my name is");

    if (window.innerWidth > 767){
        await tty.code("profileEl.querySelector('.name').innerHTML = profilePayload.name;", "js");
    } else {
        await tty.code("console.log(`${profilePayload.name}`)", "js");
        await tty.writeLine(`=> ${profilePayload.name}`, { color: Color.GRAY });
    }
    profileEl.querySelector('.name').innerHTML = profilePayload.name;

    await tty.idle(300);
    await tty.writeLine("And I am");

    if (window.innerWidth > 767){
        await tty.code("profileEl.querySelector('.age').innerHTML = `${profilePayload.age} years old`;", "js");
    } else {
        await tty.code("console.log(`${profilePayload.age} years old`)", "js");
        await tty.writeLine(`=> ${profilePayload.age} years old`, { color: Color.GRAY });
    }
    profileEl.querySelector('.age').innerHTML = `${profilePayload.age} years old`;
    await tty.idle(300);

    await tty.writeLine("Man, this is tedious...");
    await tty.writeLine("I don't want to waste your precious time.");
    await tty.writeLine("Let me quickly spin up a vuejs app here. One moment.");

    await tty.code("import Vue from 'vue'", "js", {typeSpeed: 10});
    await tty.code("import PROFILE_TEMPLATE from 'templates'", "js", {typeSpeed: 10});
    await tty.code("profileEl.innerHTML = PROFILE_TEMPLATE;", "js", {typeSpeed: 10});
    await tty.code(`const app = new Vue({ el: '#profile', data: profilePayload })`, "js", {typeSpeed: 10});
    await tty.idle(200);

    await tty.writeLine("We need to go faster", { typeSpeed: 10 });
    await tty.idle(200);

    await tty.writeLine("fasteeeeeeeeeeeeeeeeeeeeeeer", { typeSpeed: 2 });
    await tty.idle(400);

    await tty.code(`import 🎩  from "snakeoil"`, "js", {typeSpeed: 10});
    await tty.code(`🎩 . enableHighPerformanceEngines()`, "js", {typeSpeed: 10})
    await tty.idle(200);

    await tty.writeLine("FASTEEEEEEEEEERRRRRRRRRRRRRRRRR");
    await tty.writeLine("/activate-power-mode");

    // This enables particles and shaking effects
    tty.powermode = true;

    await tty.code(`🎩 . buildFluxCompensator()`, "js", {typeSpeed: 10});
    await tty.code(`🎩 . flipBits()`, "js", {typeSpeed: 10});
    await tty.code(`🎩 . inventSelfReproducingJetFuelEngine()`, "js", {typeSpeed: 7});
    await tty.code(`🎩 . initateRabbitHoleWrapTunnel()`, "js", {typeSpeed: 4});
    await tty.code(`🎩 . drinkSomeSnakeOil()`, "js", {typeSpeed: 4});
    await tty.code(`🎩 . hackIntoTime()`, "js", {typeSpeed: 4});
    await tty.code(`window.chrome.hackIntoTime()`, "js", {typeSpeed: 4});
    await tty.code(`summonClippy()`, "js", {typeSpeed: 4});
    await tty.code(`require('timemachine')`, "js", {typeSpeed: 4});
    await tty.code(`Ook. Ook? Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook. Ook! Ook?`, "js", {typeSpeed: 4});
    await tty.code(`callStackOverflowForHelp()`, "js", {typeSpeed: 4});
    await tty.code(`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa()`, "js", {typeSpeed: 4});
    await tty.code(`<:48:x<:65:=<:6C:$=$=$$~<:03:+$~<:ffffffffffffffbd:+$<:ffffffffffffffb1:+$<:57:~$~<:18:x+`, "js", {typeSpeed: 4});
    await tty.code(`]xhhhhooooooooohhhhhhxooooooooxooooooxjjjxhoooohhhxhohhhhhhhxhhhhjjjhhhxhhhhooooooooohhhhhhx`, "js", {typeSpeed: 4});

    tty.powermode = false;
    
    await tty.idle(1000);
    
    await tty.writeLine("Ok... That should be a good homepage now. Let's see.");

    // Show website
    document.body.classList.add("segment-5");

    // Really load a vue app in case someone is curious
    profileEl.innerHTML = PROFILE_TEMPLATE;
    const app = new Vue({ el: '#profile', data: profilePayload })
    await tty.idle(1000);
    
    await tty.writeLine("Phew. Alright, I'm done here.")
    await tty.writeLine(`Have fun on my site.`);

    // TTY automatically scrolls down, lets prevent that.
    tty.autoScroll = false;

    // TODO: Do not show this script the whole time.
    /*await tty.writeLine(`PS: You don't have to go through all this anymore.`);
    await tty.writeLine(`I gave your browser a cookie.`);
    await tty.writeLine(`You can however replay this by clearing your browser cache`);*/
    //sessionStorage.setItem("skip", "1");
}, false);