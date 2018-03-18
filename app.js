const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "taketv", "habathcx", "RobotCaleb", "brobson"];

channels.forEach(function(channel) {
    checkState(channel);
});



function checkState(channel) {
    const checkRequest = new XMLHttpRequest();// http://youmightnotneedjquery.com
    checkRequest.open('GET', 'https://wind-bow.glitch.me/twitch-api/streams/' + channel + '/', true);

    checkRequest.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            // Success!
            const data = JSON.parse(this.response);
            if (data.stream === null) {
                offline(channel);
            } else {
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
    let card = '<article class="card online"><img src="' + logo + '" class="avatar" alt="' + name + ' avatar"><a href="' + url + '" class="name" target="_blank"><h2>' + name + ' <span class="game">' + game + '</span></h2></a><p class="followers">Followers ' + followers + ' • Viewers ' + viewers + '</p><p class="status">' + status + '</p></article>';
    
    document.getElementById('container').insertAdjacentHTML('beforeend', card)
}



function offline(channel) {
//    console.log(channel + ' is offline.');

    const request = new XMLHttpRequest();
    request.open('GET', 'https://wind-bow.glitch.me/twitch-api/channels/' + channel + '/', true);

    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            // Success!
            const data = JSON.parse(this.response);
            
            const logo = data.logo;
            const url = data.url;
            const name = data.display_name;
            const followers = data.followers < 1000 ? data.followers : (data.followers / 1000).toFixed(1) + "K";
            const status = data.status;
            
            let card = '<article class="card"><img src="' + logo + '" class="avatar" alt="' + name + ' avatar"><a href="' + url + '" class="name" target="_blank"><h2>' + name + '</h2></a><p class="followers">Followers ' + followers + '</p><p class="status">' + status + '</p></article>';

            document.getElementById('container').insertAdjacentHTML('beforeend', card)
        } else {
            // We reached our target server, but it returned an error
            console.log('ERROR!!');
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        console.log('CONNECTION ERROR!!');
    };

    request.send();
    
}
