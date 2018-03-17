// http://youmightnotneedjquery.com
const request = new XMLHttpRequest();
request.open('GET', 'https://wind-bow.glitch.me/twitch-api/streams/ESL_SC2', true);

request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
        // Success!
        const data = JSON.parse(this.response);
        console.log(data.stream.channel.logo);
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