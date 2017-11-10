 <template>
	<div class="loading_container">
         <div class="loading">
             <span>正在加载更多......</span>
         </div>
	</div>
</template>

<script>
    export default {
    	data(){
            return{

            }
        },
        mounted(){

        }
    }
</script>

<style lang="scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}
// 滚动loading表现
.loading_container {
    color: #C8CCD4;
    text-align: center;
    font-size: rem(12);
    vertical-align:middle;
    height:rem(30);
    line-height: rem(30);
    .loading:before {
        content: '';
        display: inline-block;
        width: rem(12);
        height: rem(12);
        margin-right: rem(5);
        background-image: url(../../assets/images/loading.png);
        background-size:100% 100%;
        vertical-align:middle;
        animation: .5s rotate360 linear infinite;
        -webkit-animation: .5s rotate360 linear infinite;
        -o-animation: .5s rotate360 linear infinite;
    }
    span{
        display:inline-block;
         vertical-align:middle;
    }
}

@keyframes rotate360 {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes -o-rotate360 {
    from {
        -o-transform: rotate(0deg);
    }
    to {
        -o-transform: rotate(360deg);
    }
}

@keyframes -webkit-rotate360 {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
</style>
