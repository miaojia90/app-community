<template>
    <section class="detail-title-container">
        <div class="item-box">
            <div class="title">
                <span class="mark spe" v-if="articleDetail.articleTag">{{articleDetail.articleTag}}</span><span class="mark top" v-if="articleDetail.isTop==1">置顶</span><span class="title-span">{{articleDetail.title}}</span>
            </div>
            <div class="head">
                <div :class="[articleDetail.isAuth==1?'user-headImg-div':'']" @click="jumpToViewFun(articleDetail.uid)">
                    <img class="user-headImg" :src="articleDetail.avatar" v-if="!!articleDetail.avatar" />
                    <img src="../../assets/images/avatar_default.png" v-if="!!!articleDetail.avatar" class="user-headImg" />
                </div>
                <div class="user-tag-box">
                    <span class="user-phone" @click="jumpToViewFun(articleDetail.uid)">{{articleDetail.nickname}}</span>
                    <span class="user-mark" v-if="!!articleDetail.userTag">{{articleDetail.userTag}}</span>
                </div>
                <div class="delete-operate" v-if="isInnerAppValue && uid == articleDetail.uid" @click="deleteArticle"><span>删除</span></div>
                <div class="follow-operate" v-if="(!!!isInnerAppValue) || (uid!=articleDetail.uid && isInnerAppValue)" :class="[articleDetail.isFocus=='1'?'readyFollow':'']" @click="followOperate(articleDetail.isFocus)"><span>{{articleDetail.isFocus=='1'?'已关注':'＋ 关注'}}</span></div>
            </div>
            <div class="bottom">
                <div class="public-date"><span>{{articleDetail.publishAt}}</span></div>
                <span class="like" v-bind:class="[articleDetail.liked ==1 ? 'active' : '']">{{articleDetail.likes}}</span>
                <span class="look">{{articleDetail.pv}}</span>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { getStore, getUserSession, checkUserSession, isInnerApp, linkedmeFun, publishComment, jumpToView } from '../../utils/mUtils';
export default {
    data() {
        return {
            isInnerAppValue: isInnerApp()
        }
    },
    computed: {
        ...mapState([
            'articleDeleteInfo',
            'followCallBackInfo'
        ])
    },
    props: ['articleDetail', 'uid', 'linkedUrl'],
    methods: {
        //删除帖子
        deleteArticle() {
            //
            let dataCallBack = {
                dataInfo: '确定需要删除吗？'
            };
            this.$emit('eventModalDialog', dataCallBack);
        },
        jumpToViewFun(uid) {
            if (!uid) {
                return;
            }
            var isInnerApp = this.isInnerAppValue;
            if (!isInnerApp) {
                // 跳转到站外个人主页
                var urlPath = '/vueApp/community/userCenter/' + uid;
                this.$router.push({ path: urlPath });
            } else {
                //跳转到主页
                let viewId = '32',
                    closeWebView = '0',
                    viewProperty = { "uid": uid };
                jumpToView(viewId, closeWebView, viewProperty);
            }
        },
        //关注帖子
        followOperate(isFocus) {
            var isInnerApp = this.isInnerAppValue;
            if (!isInnerApp) {
                // 跳转到主页
                window.location.href = this.linkedUrl;
                return;
            } else {
                //关注取消关注
                var that = this;
                checkUserSession(function() {
                    let args = {
                        "uid": getStore("sessionUid"),
                        "sid": getStore("sessionSid"),
                        "targetUid": that.articleDetail.uid,
                        "focusType": isFocus == 1 ? 0 : 1
                    };
                    that.followOperateFun(args);
                });
            }
        },
        ...mapActions([
            'deleteArticleFun',
            'followOperateFun'
        ])
    },
    watch: {
        followCallBackInfo(value) {
            let message = "";
            if (value && value.focusStatus == 1) {
                message = "关注成功";
            } else if (value && value.focusStatus == 0) {
                message = "取消关注成功";
            } else {
                message = value.message;
            }
            let callBack = {
                "message": message
            }
            this.$emit('eventFollowCallBack', callBack);
        }
    },
    mounted: function() {
        // document.title = this.headTitle;
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

.detail-title-container {
    .user-tag-box {
        /*float: left;*/
    }
    .item-box {
        padding: rem(15);
        background-color: #FFF;
        .title {
            font-size: rem(25);
            color: #3C415F;
            word-wrap: break-word;
            .title-span {
                /*margin-left: rem(10);*/
                vertical-align: middle;
            }
            .mark {
                display: inline-block;
                font-size: rem(12);
                padding: rem(2) rem(5);
                vertical-align: middle;
                margin-right: rem(8);
                &.top {
                    color: #F74C31;
                    border: 1px solid #F74C31;
                }
                &.spe {
                    color: #C4950F;
                    border: 1px solid #C4950F;
                }
            }
        }
        .head {
            overflow: hidden;
            padding: rem(10) 0;
            display: flex;
            align-items: center;
            height: rem(40);
            .user-headImg-div {
                position: relative;
                &:after {
                    content: '';
                    width: rem(8);
                    height: rem(8);
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    background: url(../../assets/images/v_big_normal.png) no-repeat center top;
                    background-size: 100% 100%;
                }
                ;
            }
            /*垂直居中*/
            .user-headImg {
                float: left;
                width: rem(22);
                height: rem(22);
                border-radius: 50%;
                margin: 1px 0;
            }
            .user-phone {
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
            }
            .delete-operate {
                float: right;
                font-size: rem(14);
                color: #B4B9C3;
                line-height: rem(24);
                vertical-align: middle;
                position: absolute;
                right: rem(15);
                span {
                    display: inline-block;
                    vertical-align: middle;
                }
                &:before {
                    content: '';
                    width: rem(14);
                    height: rem(14);
                    display: inline-block;
                    margin-right: rem(3);
                    vertical-align: middle;
                    background: url(../../assets/images/delete.png) no-repeat center top;
                    background-size: 100% 100%;
                }
            }
            .follow-operate {
                border-radius: rem(24);
                border: 1px solid #d2b978;
                color: #d2b978;
                position: absolute;
                right: rem(15);
                font-size: rem(14);
                padding: rem(7) rem(5);
                width: rem(70);
                text-align: center;
                vertical-align: middle;
                &.readyFollow {
                    background-color: #E6E9EB;
                    color: #82879B;
                    border: 0px solid #d2b978;
                }
            }
        }
        .content {
            font-size: rem(18);
            color: #555A73;
            line-height: rem(25);
        }
        .bottom {
            overflow: hidden;
            .public-date {
                float: left;
                font-size: rem(14);
                color: #B4B9C3;
                line-height: rem(24);
                span {
                    display: inline-block;
                    vertical-align: middle;
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
                margin-left: rem(10);
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
                &.active {
                    animation: comment-scale 1s ease-in-out 1;
                    -webkit-animation: comment-scale 1s ease-in-out 1;
                    color: #D2B978;
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
                margin-left: rem(10);
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