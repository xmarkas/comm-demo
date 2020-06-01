<template>
  <div class="text-center">
    <!-- add/close toggle -->
    <v-btn
      id="add-button"
      fab
      small
      :color="showAddMenu ? 'error' : 'primary'"
      :style="
        showAddMenu ? 'transform:rotate(45deg)' : 'transform:rotate(0deg)'
      "
      @click="menuToggle()"
      ><v-icon>mdi-plus</v-icon></v-btn
    >

    <div
      id="add-menu"
      :style="showAddMenu ? 'height: 250px!important' : 'height:0'"
    >
      <!-- form -->
      <v-form style="width: 80%">
        <v-text-field
          v-model="firstname"
          :rules="nameRules"
          :counter="30"
          label="Name"
          required
        ></v-text-field>

        <v-text-field v-model="phoneNumber" label="Phone Number" required></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <!-- save new contact -->
        <v-btn id="save-button" fab small color="#00a700" @click="saveContact()"
          ><v-icon>mdi-check</v-icon></v-btn
        >
      </v-form>
    </div>
  </div>
</template>

<style>
#add-menu {
  height: 0;
  display: flex;
  transition: height 0.8s;
  overflow: hidden;
}

#add-button {
  position: absolute;
  transition: transform 0.8s;
  right: 0;
  z-index: 100;
}
</style>

<script>
import { mapState } from 'vuex';
export default {
  data: () => ({
    showAddMenu: false,
    valid: false,
    firstname: "",
    phoneNumber: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 30 || "Name must be less than 30 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  computed: {
      ...mapState({
          contacts: state => state.phone.contacts
      })
  },
  methods: {
    menuToggle: function() {
      this.showAddMenu = !this.showAddMenu;
    },
    saveContact: function(data) {
        console.log(this.firstname, this.phoneNumber, this.email)
        this.showAddMenu = false;
        let payload = {
            name: this.firstname,
            phone: this.phoneNumber,
            email: this.email,
            avatar: null
        }
        this.$store.commit('phone/addContact', payload);
        
    }
  }
};
</script>
