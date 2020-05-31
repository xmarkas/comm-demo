<template>
  <v-card dark class="work-space">
    <v-row class="no-gutters">
      <v-col cols="8">
          <div style="border-style: none none solid none;height: 100%"></div>
      </v-col>
      <v-col cols="4">
        <div class="interface-menu px-3" style="border-style: none none solid none;">
          <button @click="view('calendar')">
            <font-awesome-icon icon="calendar-day" color="white" />
          </button>
          <button @click="view('phone')"><font-awesome-icon icon="phone" color="white" /></button>
          <button @click="view('sms')"><font-awesome-icon icon="sms" color="white" /></button>
          <button>
            <font-awesome-icon icon="address-card" color="white" />
          </button>
          <button>
            <font-awesome-icon icon="envelope-open" color="white" />
          </button>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
          <ContactsList />
      </v-col>
      <v-col
        cols="8"
        style="border-color: white; border-style: none none none solid;min-height:600px;max-height:650px"
      >
        <v-container style="min-height:inherit">
          <Calendar v-if="whichComponent === 'calendar'" />
          <Phone v-if="whichComponent === 'phone'" />
          <SMS v-if="whichComponent === 'sms'" />
        </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.work-space {
  width: 100vw;
  border-radius: 5px;
}

.interface-menu {
  font-size: large;
  display: flex;
  justify-content: space-around;
}

.interface-menu button {
  cursor: pointer;
  display: flex;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
}

.interface-menu > :hover {
  background-color: dodgerblue;
}
</style>

<script>
import Calendar from "~/components/Calendar.vue";
import Phone from "~/components/Phone.vue";
import SMS from "~/components/SMS.vue";
import ContactsList from "~/components/ContactsList.vue";

function view() {
  console.log("test");
}

export default {
  components: {
    Calendar,
    Phone,
    SMS,
    ContactsList
  },
  data: () => ({
    whichComponent: 1,
    view: function(target) {
      this.whichComponent = target;
    }
  })
};
</script>
