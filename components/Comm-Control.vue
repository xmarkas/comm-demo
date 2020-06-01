<template>
  <v-card light height="85" style="overflow:hidden">
    <v-row no-gutters style="height: inherit">
      <v-col cols="3" class="py-0">
        <!-- SMS -->
        <div class="comm-card">
          <div class="comm-header">
            <font-awesome-icon icon="sms" color="green" />
          </div>
          <div class="comm-msg">1 new message</div>
        </div>
      </v-col>
      <v-col cols="3" class="py-0">
        <!-- emails -->
        <div class="comm-card">
          <div class="comm-header">
            <font-awesome-icon icon="envelope-open" color="dodgerblue" />
          </div>
          <div class="comm-msg">0 new emails</div>
        </div>
      </v-col>
      <v-col cols="6" class="py-0">
        <!-- phone -->
        <div class="comm-card" style="position: relative">
          <div class="comm-header">
            <!-- caller id  -->
            <span style="font-size: 1rem" v-if="plivoUser">{{
              callerId ? callerId : "Status: Online"
            }}</span>
            <span></span>
            <!-- answer call -->
            <v-btn
              class="mx-2"
              color="#00a700"
              small
              dark
              v-if="callerId && !currentCall"
              @click="answerCall()"
            >
              Accept<font-awesome-icon
                icon="phone"
                color="white"
                class="ml-2"
                style="font-size:1rem"
              />
            </v-btn>
            <!-- ignore call -->
            <v-btn
              class="mx-2"
              color="primary"
              small
              dark
              v-if="callerId && !currentCall"
              @click="ignoreCall()"
            >
              Ignore<font-awesome-icon
                icon="phone-slash"
                color="white"
                class="ml-2"
                style="font-size:1rem"
              />
            </v-btn>
            <!-- hangup call -->
            <v-btn
              class="mx-2"
              color="error"
              small
              dark
              v-if="currentCall"
              @click="hangUpCall()"
            >
              End Call<font-awesome-icon
                icon="phone"
                color="white"
                class="ml-2"
                style="font-size:1rem; transform:rotate(225deg)"
              />
            </v-btn>
            <v-badge
              v-if="!callerId"
              color="red"
              content="!"
              offset-y="35"
              :overlap="true"
              :left="true"
              :bottom="true"
              :value="!plivoUser"
              style="float:right;line-height: inherit; margin-bottom: -3px"
            >
              <font-awesome-icon icon="phone" color="darkorange" />
            </v-badge>
          </div>
          <div
            
            :style="showLogin ? 'position:absolute;top:5px' : ''"
          >
            <!-- pre login -->
            <v-btn small v-if="!plivoUser && !showLogin" @click="setLogin()"
              >login</v-btn
            >
            <div v-if="showLogin">
              <v-text-field
                light
                label="Password"
                outlined
                dense
                hide-details="true"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                @keyup="ev => (passwordInput = ev.target.value)"
              ></v-text-field>
              <v-btn
                class="mt-1"
                small
                color="success"
                :loading="tryLogin"
                @click="phoneLogin()"
                >Sign In</v-btn
              >
            </div>
            <!-- post login -->
            <v-slider
              v-if="plivoUser"
              append-icon=""
              prepend-icon=""
              :min="0"
              :max="100"
              :disabled="false"
              :readonly="false"
              :vertical="false"
              range="false"
              label="Volume"
            ></v-slider>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style>
.comm-card {
  height: 80px;
  background: aliceblue;
  margin: 2px;
  border-radius: 5px;
  padding: 5px;
}

.comm-header {
  /* text-align: right; */
  padding: 0 2px 0 0;
}

.comm-header:nth-child(1) {
  font-size: x-large;
}

.comm-msg {
  text-align: center;
  font-size: small;
}
</style>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    showPassword: false,
    showLogin: false,
    passwordInput: "",
    tryLogin: false,
    callerId: null,
    currentCall: null,
    setLogin: function() {
      this.showLogin = true;
    }
  }),
  mounted() {
    /**
     * Plivo events
     */
    let plivo = this.$Plivo;

    // onLogin
    plivo.client.on("onLogin", () => {
      this.setPlivoUser();
      this.showLogin = false;
      this.tryLogin = false;
    });

    // onIncomingCall
    plivo.client.on("onIncomingCall", (callerId, headers, callInfo) => {
      console.log(callInfo);
      this.callerId = callInfo.src;
    });

    // onCallAnswered
    plivo.client.on("onCallAnswered", callInfo => {
      this.currentCall = callInfo;
    });

    // onCallTerminated
    plivo.client.on("onCallTerminated", (hangupInfo, callInfo) => {
      this.currentCall = null;
      this.callerId = null;
    });
  },
  methods: {
    phoneLogin: function() {
      this.tryLogin = true;
      this.$Plivo.client.login(this.sipId, this.passwordInput);
    },
    answerCall: function() {
      this.$Plivo.client.answer();
    },
    setPlivoUser() {
      this.$store.commit("plivo/updatePlivoUser", true);
    },
    hangUpCall: function() {
      this.$Plivo.client.hangup();
    },
    ignoreCall: function() {
      this.$Plivo.client.ignore();
      this.currentCall = null;
      this.callerId = null;
    }
  },
  computed: {
    ...mapState({
      plivoUser: state => state.plivo.plivoUser,
      sipId: state => state.plivo.sipId
    })
  }
};

/**
 * Initialize Plivo listeners
 */
</script>
