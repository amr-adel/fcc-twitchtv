const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "taketv", "habathcx", "RobotCaleb", "brobson"];


//// http://youmightnotneedjquery.com
//const request = new XMLHttpRequest();
//let state = 'online';
//let type = (state === 'offline' ? 'channels' : 'streams');
//let name = 'esl_sc2';
//request.open('GET', 'https://wind-bow.glitch.me/twitch-api/' + type + '/' + name + '/', true);
//
//request.onload = function() {
//    if (this.status >= 200 && this.status < 400) {
//        // Success!
//        const data = JSON.parse(this.response);
//        console.log(data.stream.game);
//    } else {
//        // We reached our target server, but it returned an error
//        console.log('ERROR!!');
//    }
//};
//
//request.onerror = function() {
//    // There was a connection error of some sort
//    console.log('CONNECTION ERROR!!');
//};
//
////request.send();



function test() {
    channels.forEach(function(channel) {
        checkState(channel);
    });
}


function checkState(channel) {
    const checkRequest = new XMLHttpRequest();// http://youmightnotneedjquery.com
    checkRequest.open('GET', 'https://wind-bow.glitch.me/twitch-api/streams/' + channel + '/', true);

    checkRequest.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            // Success!
            const data = JSON.parse(this.response);
            if (data.stream === null) {
                console.log("offline");
            } else {
                console.log("online");
                const logo = data.stream.channel.logo;
                const url = data.stream.channel.url;
                const name = data.stream.channel.display_name;
                const game = data.stream.game;
                const followers = data.stream.channel.followers < 1000 ? data.stream.channel.followers : (data.stream.channel.followers / 1000).toFixed(1) + "K";
                const viewers = data.stream.viewers;
                const status = data.stream.channel.status;
                online(logo, url, name, game, followers, viewers, status);
            }
        } else {
            // We reached our target server, but it returned an error
            console.log('ERROR!!');
        }
    };

    checkRequest.onerror = function() {
        // There was a connection error of some sort
        console.log('CONNECTION ERROR!!');
    };
    
    checkRequest.send();
}

function online(logo, url, name, game, followers, viewers, status) {
    let card = '<article class="card online"><img src="' + logo + '" class="avatar" alt="' + name + ' avatar"><a href="' + url + '" class="name" target="_blank"><h2 class="namef">' + name + ' <span class="game">' + game + '</span></h2></a><p class="followers">Followers ' + followers + ' • Viewers ' + viewers + '</p><p class="status">' + status + '</p></article>';
    
    document.getElementById('container').insertAdjacentHTML('beforeend', card)
}



