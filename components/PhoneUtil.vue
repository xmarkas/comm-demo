<template>
    <v-card id="call-history" class="mx-auto" tile>
        <v-list flat>
            <v-subheader class="justify-space-between">
                <div>Call History</div>
                <div class="d-flex align-center">
                    <div class="mr-2" style="font-size: large">Jano Smith</div>
                    <v-btn style="transform: rotate(45deg)" color="error" fab small><v-icon dark>mdi-plus</v-icon></v-btn>
                </div>
            </v-subheader>
            <v-list-item v-for="(item,i) in items" :key="i">
                <!-- avatar -->
                <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
                <!-- date -->
                <v-list-item-content>
                    <v-list-item-title v-text="item.date"></v-list-item-title>
                </v-list-item-content>
                <!-- direction -->
                <v-list-item-content>
                    <v-list-item-title v-text="item.direction"></v-list-item-title>
                </v-list-item-content>
                <!-- duration -->
                <v-list-item-content>
                    <v-list-item-title v-text="item.duration"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

    </v-card>
</template>

<style>
#call-history {
    font-size: small;
}
</style>

<script>
  export default {
    data: () => ({
      items: [
        {date: '5/16/20 5:13pm', direction: 'Incoming', duration: '00:43:12',avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        {date: '5/16/20 4:15pm', direction: 'Outgoing',duration: '00:00:19',avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { date: '5/14/20 11:20am', direction: 'Outgoing',duration: '00:05:51',avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { date: '5/3/20 10:37am', direction: 'Incoming',duration: '00:23:40',avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
      ]
    }),
  }
</script>