<template>
  <div id="dial-pad">
    <v-row>
      <!-- ROW 1 -->
      <v-col class="key" @click="sendDigits('1')">
        <v-row class="digit justify-center">1</v-row>
        <v-row class="alpha justify-center"></v-row>
      </v-col>
      <v-col class="key" @click="sendDigits('2')">
        <v-row class="digit justify-center">2</v-row>
        <v-row class="alpha justify-center">ABC</v-row>
      </v-col>
      <v-col class="key" @click="sendDigits('3')">
        <v-row class="digit justify-center">3</v-row>
        <v-row class="alpha justify-center">DEF</v-row>
      </v-col>
    </v-row>
    <!-- ROW 2 -->
    <v-row>
      <v-col class="key" @click="sendDigits('4')">
        <v-row class="digit justify-center">4</v-row>
        <v-row class="alpha justify-center">GHI</v-row>
      </v-col>
      <v-col class="key" @click="sendDigits('5')">
        <v-row class="digit justify-center">5</v-row>
        <v-row class="alpha justify-center">JKL</v-row>
      </v-col>
      <v-col class="key" @click="sendDigits('6')">
        <v-row class="digit justify-center">6</v-row>
        <v-row class="alpha justify-center">MNO</v-row>
      </v-col>
    </v-row>
    <!-- ROW 3 -->
    <v-row>
      <v-col class="key" @click="sendDigits('7')">
        <v-row class="digit justify-center">7</v-row>
        <v-row class="alpha justify-center">PQRS</v-row>
      </v-col>
      <v-col class="key" @click="sendDigits('8')">
        <v-row class="digit justify-center">8</v-row>
        <v-row class="alpha justify-center">TUV</v-row>
      </v-col>
      <v-col class="key" @click="sendDigits('9')">
        <v-row class="digit justify-center">9</v-row>
        <v-row class="alpha justify-center">WXYZ</v-row>
      </v-col>
    </v-row>
    <!-- ROW 4 -->
    <v-row>
      <v-col class="key" @click="sendDigits('*')">
        <v-row class="digit justify-center" style="font-size: x-large;"
          >*</v-row
        >
      </v-col>
      <v-col class="key" @click="sendDigits('0')">
        <v-row class="digit justify-center">0</v-row>
      </v-col>
      <v-col class="key" @click="sendDigits('#')">
        <v-row class="digit justify-center" style="font-size: x-large;"
          >#</v-row
        >
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
#dial-pad {
  width: 90%;
  background: #1976d2;
  padding: 20px;
  border-radius: 5px;
}

.key {
  background: rgba(0, 0, 0, 0.3);
  margin: 2px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  height: 56px;
  user-select: none;
  cursor: pointer;
}

.key:hover {
  background-color: dimgray;
}

.alpha {
  font-size: 0.7rem;
  color: #b3b3b3;
  font-weight: 600;
  line-height: 0.2;
}
</style>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    sendDigits: function(digit) {
      this.$Plivo.client.sendDtmf(digit);
      this.$store.commit('phone/updateDialNumber', this.dialNumber + digit);
    }
  }),
  methods: {},
  computed: {
      ...mapState({
          dialNumber: state => state.phone.dialNumber
      })
  }
  
};
</script>
