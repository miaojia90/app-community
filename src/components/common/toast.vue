 <template>
	<div class="toast-container">
         <p class="toast-text">{{toastInfo}}</p>
	</div>
</template>

<script>
    export default {
    	data(){
            return{

            }
        },
        props: ['toastInfo'],
        mounted(){

        }
    }
</script>

<style lang="scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}
// 滚动loading
.toast-container {
    width:rem(220);
    line-height: rem(50);
    position:fixed;
    top:50%;
    left:50%;
    margin-left:rem(-110);
    margin-top:rem(-50);
    background-color: rgba(0,0,0,0.6);
    border-radius: rem(10);
    .toast-text{
        color:#FFF;
        font-size:rem(16);
        text-align: center;
        padding: 0 rem(10);
    }
}
</style>
