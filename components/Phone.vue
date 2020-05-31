<template>
  <div id="phone">
    <v-row>
      <v-col><PhoneUtil/></v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center align-center"><CallControls/></v-col>
      <v-col class="d-flex justify-center align-center"><DialPad /></v-col>
    </v-row>
  </div>
</template>

<style scoped>
#phone {
    min-height: inherit;
    display: grid;
    grid-template-rows: 50%;
}
</style>

<script>
import DialPad from "~/components/DialPad.vue";
import CallControls from "~/components/CallControls.vue";
import PhoneUtil from "~/components/PhoneUtil.vue";

export default {
  components: {
    DialPad,
    CallControls,
    PhoneUtil
  }
};
</script>
