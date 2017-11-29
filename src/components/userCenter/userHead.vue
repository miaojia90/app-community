<!-- 用户头部 -->
<template>
    <section class="user-head-container">
        <div class="user-head" :class="[userDetail.isAuth==1?'isAuth':'']">
        <!-- <div class="user-head" > -->
                <img  class="user-head-img" :src="userDetail.avatar"  v-if="!!userDetail.avatar"/>
                <img src="../../assets/images/avatar_default.png"  v-if="!!!userDetail.avatar"  class="user-head-img"/> 
        </div>
        <p class="user-name">{{userDetail.nickName}}</p>
        <p class="mark" v-if="!!userDetail.userTag">
            <span>{{userDetail.userTag}}</span>
        </p>
        <p class="other" >
          <a :href="linkedUrl" class="linkedme">
            <span>关注 {{userDetail.focusNum}}</span>
            <span class="split"></span>
            <span>粉丝 {{userDetail.fansNum}}</span>
          </a>
        </p>
        <p class="desc" :class="[(userDetail.introduce && userDetail.isAuth==1)?'active':'']"><span class="two-line-break">{{userDetail.introduce}}</span></p>
        <div class="follow-operate" >
           <a :href="linkedUrl" class="linkedme">
            <span>＋ 关注</span>
           </a>
        </div>
    </section>
</template>
<script>
import { getStore, checkUserSession, isInnerApp, linkedmeFun, publishComment } from '../../utils/mUtils';
export default {
    data() {
        return {
            isInnerAppValue: isInnerApp()
        }
    },
    computed: {
       
    },
    props: ['userDetail','linkedUrl'],
    methods: {
        //删除帖子
        linkedmeCallFun(){
            return this.linkedUrl;
        }
    },
    mounted: function() {
        document.title = this.userDetail.nickName;
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

.user-head-container {
    background: #FFF;
    padding: rem(20) rem(18);
    position: relative;
    .user-head {
        position: relative;
        width: rem(70);
        height: rem(70);
        margin: 0 auto;
        .user-head-img {
            width: rem(70);
            height: rem(70);
            display: block;
            border-radius: 50%;
            margin: 0 auto;
        }
        &.isAuth:before {
            position: absolute;
            bottom: rem(0);
            content: '';
            display: inline-block;
            width: rem(20);
            height: rem(20);
            right: 0;
            background: url(../../assets/images/v_big.png) no-repeat center top;
            background-size: 100% 100%;
        }
    }
    .user-name {
        color: #3C415F;
        font-size: rem(20);
        text-align: center;
        padding: rem(10) 0;
    }
    .mark {
        display: flex;
        justify-content: center;
        padding-bottom: rem(10);
        span {
            padding: 0 rem(5);
            color: #84899A;
            font-size: rem(14);
            line-height: rem(25);
            border: 1px solid #B4B9C3;
            border-radius: rem(20);
        }
    }
    .other {
        a:hover, a:visited, a:link, a:active {
            color: #555A73;
            padding-top: rem(10);
            padding-bottom: rem(15);
            display: flex;
            justify-content: center;
            align-items: center;
            color: #555A73;
            font-size: rem(18);
        }
        .split {
            width: rem(1);
            height: rem(15);
            background-color: #E6E9EB;
            margin: 0 rem(20);
        }
    }
    .desc {
        color: #555A73;
        font-size: rem(16);
        position: relative;
        span {
            display: inline-block;
            vertical-align: middle;
            &.two-line-break {
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                word-break: break-all;
            }
        }
        &.active{
            span{
                padding-left: rem(20);
            }
            &:before {
                content: '';
                position: absolute;
                display: inline-block;
                width: rem(14);
                height: rem(14);
                top: rem(4);
                background: url(../../assets/images/v_big_normal.png) no-repeat center top;
                background-size: 100% 100%;
                vertical-align: middle;
                margin-right: rem(5);
            }
        }
    }
}

.follow-operate {
    position: absolute;
    top: rem(20);
    right: rem(18);
    font-size: rem(14);
    color: #B4923B;
    border-radius: rem(30);
    border: 1px solid #B4923B;
    padding:rem(7) rem(5);
    width:rem(70);
    text-align: center;
    a:hover, a:visited, a:link, a:active {
       color: #B4923B;
    }
    &.readyFollow {
        background-color: #E6E9EB;
        color: #82879B;
        height: rem(30);
        line-height: rem(30);
        border: 0px solid #d2b978;
    }
}
</style>