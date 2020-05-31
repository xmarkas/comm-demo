import Plivo from 'plivo-browser-sdk';
import Vue from 'vue';



// Initialize Plivo
var options = {
    debug: "INFO",
    permOnClick: true,
    audioConstraints: {
        optional: [
            { googAutoGainControl: true },
            { googEchoCancellation: true }
        ]
    },
    enableTracking: true,
    codecs: ["OPUS", "PCMU"],
    allowMultipleIncomingCalls: true
};

const sdk = new Plivo(options);

Vue.use(sdk);

export default ({ app }, inject) => {
    inject('Plivo', sdk)
  }