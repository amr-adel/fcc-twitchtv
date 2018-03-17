const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];


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
                console.log("offline");
            } else {
                console.log("online");
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