<template>
  <div class="notfound">
    <img src="../assets/images/no_server.png"/>
    <p>财富迷航</p>
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
    },
    components: {}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}
.notfound{
  img{
    width:rem(120);
    height: rem(120);
    display: block;
    margin:rem(150) auto 0 auto;
  }
  p{
    font-size: rem(16);
    text-align: center;
    line-height: rem(40);
    color:#ADB0BC;
  }
}
</style>