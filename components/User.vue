<template>
  <v-card height="85" width="300" elevation="10" dark>
    <v-row>
      <v-col class="d-flex justify-center" style="font-size: small">
          <font-awesome-icon icon="cog" style="position: absolute; left: 10px;top:10px; color:gray"/>
        <v-avatar size="60" style="box-shadow: rgb(224, 224, 224) 0px 0px 0px 3px;">
          <v-img :src="require('~/assets/mark_profile_img.png')"></v-img>
        </v-avatar>
        <div class="ml-3 text-center">
            <div>User Name</div>
            <div>Status</div>
            <small>(206) 259-2279</small>
        </div>

      </v-col>
    </v-row>
  </v-card>
</template>
