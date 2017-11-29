<template>
    <section class="list-item-section">
        <div class="item-box" v-for="(item,index) in itemTopic.items">
            <div @click="enterCommunityDetail(item.id)">
                <div class="head">
                    <div class="user-headImg-div" :class="[item.isAuth==1?'active':'']">
                        <img class="user-headImg" :src="item.avatar" v-if="!!item.avatar" />
                        <img src="../../assets/images/avatar_default.png" v-if="!!!item.avatar" class="user-headImg" />
                    </div>
                    <span class="user-name">{{item.nickname}}</span>
                    <span class="user-mark" v-if="item.userTag">{{item.userTag}}</span>
                    <span class="public-date">{{item.publishAt}}</span>
                </div>
                <div class="content two-line-break">
                    <span class="mark top" v-if="item.isTop==1">置顶</span><span>{{item.title}}</span>
                </div>
                <div class="bottom">
                    <span class="mark spe" v-if="item.articleTag">{{item.articleTag}}</span>
                    <span class="like">{{item.pv}}</span>
                    <span class="comment">{{item.commentNum}}</span>
                    <span class="look">{{item.pv}}</span>
                </div>
            </div>
        </div>
        <div v-if="!(itemTopic.items.length>0)" class="no-article">
            <img src="../../assets/images/notfund_article.png" />
            <p>暂无相关帖子</p>
        </div>
        <div class="open-app-area" v-if="itemTopic.page.count>3">
            <a :href="linkedUrl" class="linkedme">打开APP查看更多</a>
        </div>
    </section>
</template>
<script>
import {
    linkedmeKey
} from '../../utils/env.js';
import { getStore, checkUserSession, isInnerApp, linkedmeFun, publishComment } from '../../utils/mUtils';
export default {
    data() {
        return {
            isInnerApp: isInnerApp() //防止重复获取
        }
    },
    props: ['listTitle', "itemTopic", "linkedUrl"],
    methods: {
        //选中的答案信息
        enterCommunityDetail(id) {
            this.$router.push({ path: '/vueApp/community/communityDetail/' + id });
        }
    },
    mounted: function() {}
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

.open-app-area {
    width: 100%;
    height: rem(40);
    line-height: rem(40);
    color: #d2b978;
    font-size: rem(16);
    text-align: center;
    background-color: #FFF;
    padding-bottom: rem(10);
    a:link,
    a:visited,
    a:hover,
    a:active {
        color: #d2b978;
    }
}

.list-item-section {
    background-color: #FFF;
    .no-article {
        padding: rem(50);
        img {
            width: rem(110);
            height: rem(110);
            margin: 0 auto;
        }
        p {
            color: #82879B;
            font-size: rem(16);
            height: rem(25);
            line-height: rem(25);
            text-align: center;
        }
    }
    .item-box {
        padding: rem(15) rem(15) 0 rem(15);
        &:after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background-color: #E6E9EB;
            transform: scaleY(0.5);
        }
        &:last-child {
            &:after {
                height: 0px;
            }
        }
        .head {
            overflow: hidden;
            padding-bottom: rem(10);
            .user-headImg-div {
                float: left;
                position: relative;
                width: rem(22);
                height: rem(22);
                vertical-align: middle;
                img {
                    border-radius: 50%;
                }
                &.active{
                    &:after {
                        content: '';
                        width: rem(8);
                        height: rem(8);
                        position: absolute;
                        bottom: rem(0);
                        right: rem(2);
                        background: url(../../assets/images/v_big_normal.png) no-repeat center top;
                        background-size: 100% 100%;
                    }
                }
            }
            .user-headImg {
                display: block;
                width: rem(22);
                height: rem(22);
            }
            .user-name {
                float: left;
                font-size: rem(16);
                color: #82879B;
                margin-left: rem(10);
                line-height: rem(24);
            }
            .user-mark {
                float: left;
                font-size: rem(12);
                color: #d2b978;
                margin-left: rem(10);
                height: rem(20);
                line-height: rem(20);
                padding: 0 rem(6);
                border: 1px solid #d2b978;
                border-radius: rem(12);
                margin-top: 1px;
            }
            .public-date {
                float: right;
                font-size: rem(14);
                color: #B4B9C3;
                line-height: rem(24);
            }
        }
        .content {
            font-size: rem(18);
            color: #555A73;
            line-height: rem(25);
            .mark {
                font-size: rem(12);
                padding: 0 rem(5);
                line-height: rem(25);
                margin-right: rem(7);
                &.top {
                    color: #F74C31;
                    border: 1px solid #F74C31;
                }
                &.spe {
                    color: #C4950F;
                    border: 1px solid #C4950F;
                    margin-left: rem(5);
                }
            }
        }
        .bottom {
            overflow: hidden;
            padding-top: rem(10);
            padding-bottom: rem(15);
            .mark {
                float: left;
                font-size: rem(12);
                padding: 0 rem(5);
                line-height: rem(22);
                &.top {
                    color: #F74C31;
                    border: 1px solid #F74C31;
                }
                &.spe {
                    color: #C4950F;
                    border: 1px solid #C4950F;
                    margin-left: rem(5);
                }
            }
            .look {
                font-size: rem(14);
                line-height: rem(22);
                color: #82879B;
                float: right;
                &:before {
                    content: '';
                    width: rem(20);
                    height: rem(20);
                    display: inline-block;
                    background: url(../../assets/images/see.png) no-repeat center top;
                    background-size: 100% 100%;
                    vertical-align: middle;
                    margin-right: rem(5);
                }
            }
            .like {
                font-size: rem(14);
                line-height: rem(22);
                color: #82879B;
                float: right;
                &:before {
                    content: '';
                    width: rem(20);
                    height: rem(20);
                    display: inline-block;
                    background: url(../../assets/images/likes_nor.png) no-repeat center top;
                    background-size: 100% 100%;
                    vertical-align: middle;
                    margin-right: rem(5);
                }
                &.acitve {
                    &:before {
                        background: url(../../assets/images/likes.png) no-repeat center top;
                        background-size: 100% 100%;
                    }
                }
            }
            .comment {
                font-size: rem(14);
                line-height: rem(22);
                color: #82879B;
                float: right;
                margin: 0 rem(20);
                &:before {
                    content: '';
                    width: rem(20);
                    height: rem(20);
                    display: inline-block;
                    background: url(../../assets/images/answer.png) no-repeat center top;
                    background-size: 100% 100%;
                    vertical-align: middle;
                    margin-right: rem(5);
                }
            }
        }
    }
}
</style>