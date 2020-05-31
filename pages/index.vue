<template>
  <v-app>
    <v-content style="background:#424242">
      <v-container fluid>
        <v-row>
          <v-col cols="4">
            <User />
          </v-col>
          <v-col cols="8">
            <CommControl />
          </v-col>
        </v-row>
        <v-row>
          <v-col><WorkSpace /> </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import User from "~/components/User.vue";
import CommControl from "~/components/Comm-Control.vue";
import WorkSpace from "~/components/WorkSpace.vue";

export default {
  components: {
    User,
    CommControl,
    WorkSpace
  },
  layout: "main"
};
</script>
