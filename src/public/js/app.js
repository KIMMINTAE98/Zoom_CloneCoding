const socket = io();    // connect backend socketIO server

const myFace = document.getElementById("myFace");

let myStream;

async function getMedia() {
    try {
        myStream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video: true,
        });
        myFace.srcobject = myStream;
    } 
    catch (e) {
        console.log(e);
    }
}

getMedia();
