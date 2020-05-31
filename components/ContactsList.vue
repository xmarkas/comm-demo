<template>
  <div id="contact-list">
    <v-list flat>
      <v-subheader>Contacts</v-subheader>
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
  </div>
</template>

<script>
import { mapState } from "vuex";

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
    ]
  }),
  computed: {
    ...mapState({
      dialNumber: state => state.phone.dialNumber
    }),
    filteredContacts: function() {
      let targetInput = this.dialNumber;
      let targetList = [];
      this.items.forEach(contact => {
        if (contact.name.toUpperCase().includes(targetInput.toUpperCase())) {
          targetList.push(contact);
        }
      });
      return targetList;
    }
  }
};
</script>
