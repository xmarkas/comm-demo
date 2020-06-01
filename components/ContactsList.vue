<template>
  <div id="contact-list" style="width:90%; margin: 0 auto; position: relative">
    <!-- Add new contact -->
    <!-- <v-btn fab small color="primary" style="position: absolute; right: 0"><v-icon>mdi-plus</v-icon></v-btn> -->
    <AddContactForm />

    <!-- Sort list -->
    <v-list
      flat
      dense
      style="border-style: none none solid none; border-color:white"
      v-if="filteredContacts().length"
    >
      <v-subheader>Matches</v-subheader>
      <v-list-item v-for="(item, i) in filteredContacts()" :key="i">
        <!-- avatar -->
        <v-list-item-avatar v-if="item.avatar">
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>
        <!-- no avatar -->
        <v-list-item-avatar v-if="!item.avatar">
          <v-btn :disabled="true" fab icon small class="bg-white"
            ><font-awesome-icon icon="user" color="dimgray" class="fa-2x"
          /></v-btn>
        </v-list-item-avatar>
        <!-- name -->
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- List -->
    <v-list flat dense>
      <v-subheader>Contacts</v-subheader>
      <v-list-item v-for="(item, i) in contacts" :key="i">
        <!-- avatar -->
        <v-list-item-avatar v-if="item.avatar">
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>
        <!-- no avatar -->
        <v-list-item-avatar v-if="!item.avatar">
          <v-btn :disabled="true" fab icon small class="bg-white"
            ><font-awesome-icon icon="user" color="dimgray" class="fa-2x"
          /></v-btn>
        </v-list-item-avatar>

        <!-- name -->
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<style>
.bg-white {
  background-color: white;
}
</style>

<script>
import { mapState } from "vuex";
import AddContactForm from "~/components/AddContactForm.vue";

export default {
  components: {
    AddContactForm
  },
  data: () => ({
    queryList: []
  }),
  computed: {
    ...mapState({
      dialNumber: state => state.phone.dialNumber,
      contacts: state => state.phone.contacts
    })
  },
  methods: {
    filteredContacts: function() {
      let targetInput = this.dialNumber;
      let targetList = [];
      this.contacts.forEach(contact => {
        if (
          contact.name.toUpperCase().includes(targetInput.toUpperCase()) &&
          targetInput.length
        ) {
          targetList.push(contact);
        }
      });
      return targetList;
    }
  }
};
</script>
