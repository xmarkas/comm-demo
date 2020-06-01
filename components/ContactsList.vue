<template>
  <div id="contact-list" style="width:90%; margin: 0 auto; position: relative">
    <!-- Add new contact -->
    <!-- <v-btn fab small color="primary" style="position: absolute; right: 0"><v-icon>mdi-plus</v-icon></v-btn> -->
    <AddContactForm />

    <!-- Sort list -->
    <v-list flat dense style="border-style: none none solid none; border-color:white" v-if="filteredContacts.length">
     
      <v-subheader>Matches</v-subheader>
      <v-list-item v-for="(item, i) in filteredContacts" :key="i">
        <!-- avatar -->
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
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
      <v-list-item v-for="(item, i) in items" :key="i">
        <!-- avatar -->
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>
        <!-- name -->
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddContactForm from '~/components/AddContactForm.vue';

export default {
  data: () => ({
    items: [
      {
        active: true,
        name: "Jano Smith",
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
      },
      {
        name: "Wes Vega",
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
      },
      {
        name: "Naomi Blackstone",
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
      },
      {
        name: "Luz Palmer",
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
      }
    ],
    queryList: []
  }),
  computed: {
    ...mapState({
      dialNumber: state => state.phone.dialNumber
    }),
    filteredContacts: function() {
      let targetInput = this.dialNumber;
      let targetList = [];
      this.items.forEach(contact => {
        if (contact.name.toUpperCase().includes(targetInput.toUpperCase()) && targetInput.length) {
          targetList.push(contact);
        }
      });
      return targetList;
    }
  }
};
</script>
