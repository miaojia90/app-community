<template>
    <section :class="sectionClass">
        <p class="title">
            <span class="title-span">
	   {{ blockDetail?blockDetail.name:''}}
	   </span>
        </p>
        <p class="desc">
            <span class="desc-span">
	   {{ blockDetail?blockDetail.introduce:'' }}
	   </span>
        </p>
        <div class="bottom-count-box">
            <span>{{blockDetail?blockDetail.articleNum:'' }}帖子</span>
            <span>{{blockDetail?blockDetail.discussNum:'' }}讨论</span>
        </div>
    </section>
</template>
<script>
export default {
    data(){
       return {
       }
    },
    props: ['blockDetail'],
    mounted: function() {
    },
    computed:{
        sectionClass(){
           let sectionClass='head-container';
           if(this.blockDetail){
              sectionClass='head-container head-bg-'+this.blockDetail.id
           }
           return  sectionClass;
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

.head-container {
    height: rem(177);
    color: #FFF;
    padding: rem(15);
    h1 {
        &.title {
            font-size: rem(30);
        }
    }
    span {
        &.title-span {
            line-height: rem(50);
            letter-spacing: rem(8);
        }
    }
    p {
        &.desc {
            padding: rem(15) 0;
            font-size: rem(16);
        }
    } 
    //股权
    &.head-bg-1 {
        background: url(../../assets/images/stock_right.png) no-repeat center top;
        background-size: 100% 100%;
    } 
    //保险
    &.head-bg-2 {
        background: url(../../assets/images/insurance.png) no-repeat center top;
        background-size: 100% 100%;
    } 
    //海外
    &.head-bg-3 {
        background: url(../../assets/images/abroad.png) no-repeat center top;
        background-size: 100% 100%;
    }
    //私募
    &.head-bg-4 {
        background: url(../../assets/images/private_placement.png) no-repeat center top;
        background-size: 100% 100%;
    }
    .bottom-count-box {
        &:before {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background-color: rgba(230,233,235,0.3);
            transform: scaleY(0.5);
        }
        font-size:rem(16);
        line-height:rem(50);
        span {
            &:nth-child(2) {
                margin-left: rem(10);
            }
        }
    }
}
</style>