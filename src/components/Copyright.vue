<template>
  <v-container>
    <v-row justify="end">
      <v-col
        cols="12"
        md="auto"
      >
        <div class="text-body-1 font-weight-light pt-6 pt-md-0 text-center">
          &copy; {{ (new Date()).getFullYear() }}, Made by <v-icon>mdi-vuetify</v-icon>
          Yudai Noda
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Copyright',

    data: () => ({
  
    }),
  }
</script>

