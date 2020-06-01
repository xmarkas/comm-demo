<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">
          Dropdown
        </v-btn>
      </template>
      <!-- form -->
      <v-form v-model="valid">
        <v-text-field
          v-model="firstname"
          :rules="nameRules"
          :counter="30"
          label="Name"
          required
        ></v-text-field>

        <v-text-field v-model="number" label="Phone Number" required></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
      </v-form>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 30 || "Name must be less than 30 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  })
};
</script>
