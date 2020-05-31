/**
 * File:            PlivoUtil.js
 * 
 * Description: Creates an instance to the Plivo browser SDK and sets up the
 *              methods that make use of webRTC.
 * 
 */


console.log(store);

// // Initialize Plivo
// var options = {
//     debug: "INFO",
//     permOnClick: true,
//     audioConstraints: {
//         optional: [
//             { googAutoGainControl: true },
//             { googEchoCancellation: true }
//         ]
//     },
//     enableTracking: true,
//     codecs: ["OPUS", "PCMU"],
//     allowMultipleIncomingCalls: true
// };

// export const plivo = new Plivo(options);


/**
 * funciton:       plivoLogin
 * 
 * @param {String} username 
 * @param {String} password 
 */
export const plivoLogin = (username, password, plivo) => {
    plivo.client.login(username, password);

    plivo.client.on('onLogin', function () {
        console.log("Plivo client logged in")
        console.log('Show store', createStore)
        
    })

    plivo.client.on('onLoginFailed', function (cause) {
        console.log(cause);
    })
}