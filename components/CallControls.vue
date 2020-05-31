<template>
  <div id="call-controls">
    <v-text-field
      @keyup="ev => updateDialNumber(ev)"
      :value="dialNumber"
      label="Enter number or contact"
      dark
    ></v-text-field>

    <div class="call-actions d-flex justify-space-around my-3 pa-3">
      <!-- Dial Number -->
      <v-btn
        v-if="dialNumber && callState === 'idle'"
        class="mx-2"
        color="#00a700"
        small
        dark
        @click="makeCall()"
      >
        Dial<font-awesome-icon
          icon="phone"
          color="white"
          class="ml-2"
          style="font-size:1rem"
        />
      </v-btn>
      <!-- End Call -->
      <v-btn
        v-if="callState != 'idle'"
        class="mx-2"
        color="error"
        small
        dark
        @click="endCall()"
      >
        End Call<font-awesome-icon
          icon="phone"
          color="white"
          class="ml-2"
          style="font-size:1rem"
        />
      </v-btn>
    </div>
    <div id="call-stats">
      <small>call duration: {{ duration }}</small>
      <small>{{ callState }}</small>
    </div>
  </div>
</template>

<style>
#call-controls {
  width: 90%;
}

#call-id {
  border-style: none none solid none;
  border-width: 1px;
}

.call-actions div {
  cursor: pointer;
  font-size: x-large;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.call-actions div:hover {
  background-color: white;
}

#call-stats {
  border-style: solid none none none;
  border-width: 1px;
  display: flex;
  justify-content: space-between;
  padding-top: 2px;
}
</style>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    callState: "idle",
    callDuration: 0,
    duration: "00:00:00",
    timer: null
  }),
  computed: {
    ...mapState({
      dialNumber: state => state.phone.dialNumber
    })
  },
  mounted() {
    // Plivo event listeners
    let plivo = this.$Plivo;

    // onCalling
    plivo.client.on("onCalling", () => {
      this.callState = "dialing";
    });

    // onCallRemoteRinging
    plivo.client.on("onCallRemoteRinging", callInfo => {
      this.callState = "ringing";
    });

    // onCallAnswered
    plivo.client.on("onCallAnswered", callInfo => {
      this.callState = "answered";
      this.callTimer();
    });

    // onCallTerminated
    plivo.client.on("onCallTerminated", (hangupInfo, callInfo) => {
      this.callState = "idle";
      clearInterval(this.timer);
      this.callDuration = 0;
    });
  },
  methods: {
    updateDialNumber(ev) {
      this.$store.commit("phone/updateDialNumber", ev.target.value);
    },
    makeCall: function() {
      let dialFormat = this.dialNumber.replace(/\W/g, "");
      dialFormat = dialFormat[0] === "1" ? dialFormat : "1" + dialFormat;

      console.log("DialFormat", dialFormat);
      this.$Plivo.client.call(dialFormat, {
        "X-PH-callerId": "12062592279"
      });
    },
    endCall: function() {
      this.$Plivo.client.hangup();
      this.callState = "idle";
      clearInterval(this.timer);
      this.callDuration = 0;
    },
    callTimer: function() {
      let timer = setInterval(() => {
        let total = this.callDuration++;

        let sec = total % 60 < 0 ? total : total % 60;
        let min = total % 3600 < 0 ? total % 3600 : Math.trunc(total / 60);
        let hour = Math.trunc(total / 3600);
        let output = `${hour < 10 ? "0" + hour : hour}:${
          min < 10 ? "0" + min : min
        }:${sec < 10 ? "0" + sec : sec}`;
        this.duration = output;
      }, 1000);

      this.timer = timer;
    }
  }
};
</script>
