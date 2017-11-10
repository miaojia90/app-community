<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        title: 'ERROR!',
      }
    },
    computed: mapState([
      'message'
    ]),
    mounted: function () {
      this.$store.commit('message', '404 Not Found！');
    },
    components: {}
  }
</script>