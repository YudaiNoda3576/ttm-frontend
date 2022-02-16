<template>
  <v-footer
    id="default-footer"
    color="transparent"
    absolute
    app
    inset
  >
  <copyright />
  </v-footer>
</template>

<script>

  import Copyright from '../../components/Copyright.vue'
  export default {
    name: 'DefaultFooter',
    components:{
      Copyright
    }
  }
</script>
