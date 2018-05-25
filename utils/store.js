import DOMAINS from './domains';
let STARTED = [];
let BLOCKS = [];
let CONNECTIONS = [];

// static getLocation(fn) {
//     // We purposefully do not cache
//     fetch("https://freegeoip.net/json/").then(function(response) {
//         response.json().then(function(data) {
//             console.log("location:", data);
//             fn(data);
//         }.bind(this));
//     }).catch(function() {
//         console.log("Connection failed");
//     });
// }

function _url(domain) {
    // TODO: Check if it already has protocol
    // TODO: Check if it already has path
    // TODO: Remove subdomains
    return "https://" + domain + "?nocache=" + Date.now();
}

/**
 Checks if a site or IP is up or down
 **/
function check_ip(domain) {
    console.log("Pinging", domain);

    fetch_resurce().then(response => console.log(response)).catch(err => console.error(err));
}

function fetch_resurce(domain) {
    return fetch(_url(domain) + "/favicon.ico",
        {
            method: "GET"
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            return responseData;
        })
}

/**
 Creates an image with the favicon for the given domain
 **/
function create_favicon(domain) {
    return "https://www.google.com/s2/favicons?domain=" + domain;
}

function checkAllDomains (ctx) {
    // Check all the domains
    for (let i in DOMAINS) {
        const domain = DOMAINS[i];
        CONNECTIONS.push({
            domain: domain,
            ping: check_ip(domain),
            favicon: create_favicon(domain),
        });
    }

    console.log(CONNECTIONS);

    return CONNECTIONS;
}

export {
    checkAllDomains
}