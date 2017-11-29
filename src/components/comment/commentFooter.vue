<template>
    <section class="comment-footer-section">
        <div class="footer-operate-box" v-if="isInnerApp">
            <div class="content">
                <div class="left" @click="publishCommentFun">
                    <div class="box">
                        <span class="comment-icon"></span>
                    </div>
                    <span>评论（{{articleDetail.commentNum}}）</span>
                </div>
                <div class="right" @click="giveThumbsUp(articleDetail.liked)" v-bind:class="thumbsUpActive">
                    <div class="box">
                        <span class="likes-icon"></span>
                    </div>
                    <span>点赞（{{articleDetail.likes}}）</span>
                </div>
            </div>
        </div>
        <div class="footer-operate-box img-bottom" v-if="!isInnerApp">
            <a :href="linkedUrl" class="linkedme">
               <img src="../../assets/images/footerBanner.png" class="footer-banner" />
            </a>
        </div>
        <toast :toastInfo="toastInfo" v-if="toastFlag"></toast>
    </section>
</template>
<script>
import {
    linkedmeKey
} from '../../utils/env.js';
import { mapState, mapActions } from 'vuex';
import { getStore, checkUserSession, isInnerApp, linkedmeFun, publishComment } from '../../utils/mUtils';
import toast from '../common/toast';
export default {
    data() {
        return {
            isInnerApp: isInnerApp(), //防止重复获取
            linkedUrl: null,
            toastInfo: '',
            toastFlag: false,
            thumbsUpActive: ''
        }
    },
    props: ['articleDetail'],
    computed: {
        ...mapState([
            'likeInfo'
        ])
    },
    components: { toast },
    methods: {
        giveThumbsUp(liked) {
            if (liked == 1) {
                return;
            }
            //点赞
            var that = this;
            //判断是否在APP中还是在H5页面
            if (this.isInnerApp) {
                //在APP中
                //进入到社区的评论
                checkUserSession(function() {
                    console.log("回调函数");
                    that.callThumbsUpInterface();
                });
            }
        },
        //发布评论
        publishCommentFun() {
            let code = "",
                type = "",
                replyCommentId = "",
                placeholder = "这一刻的想法...";
            code = this.articleDetail.id;
            type = "community";
            var that = this;
            publishComment(code, type, replyCommentId, placeholder, function() {
                that.publishCommentCallBack();
            });
        },
        publishCommentCallBack() {
            var dataCallBack = {
                state: 'success'
            };
            //回复评论的回调函数
            this.$emit('eventCallBack', dataCallBack);
        },
        //调用点赞的接口
        async callThumbsUpInterface() {
            let sid = getStore("sessionSid");
            let uid = getStore("sessionUid");
            let articleId = this.articleDetail.id;
            let args = { "articleId": articleId, "uid": uid, "sid": sid };
            console.log("argsxx", args);
            await this.thumbsUpFun(args);
        },
        //linkedMe
        linkedMeFun(responseUrl) {
            this.linkedUrl = responseUrl;
        },
        ...mapActions([
            'thumbsUpFun'
        ])
    },
    mounted: function() {
        if (this.articleDetail.liked == 1) {
            this.thumbsUpActive = "active";
        }
        //linkedme
        linkedmeFun(this.linkedMeFun);
    },
    watch: {
        likeInfo: function(value) {
            console.log("xxxx", value);
            if (value.error) {
                //错误信息
                this.toastInfo = value.error.message;
            } else {
                //判断成功的标志
                if (value == 1) {
                    this.toastInfo = "点赞成功！";
                    this.thumbsUpActive = 'active';
                    let dataCallBack = {
                        state: 'success'
                    };
                    this.$emit('eventCallBack', dataCallBack);
                }
            }
            this.toastFlag = true;
            var that = this;
            setTimeout(function() {
                that.toastFlag = false;
                that.toastInfo = "";
            }, 3000)
        },
        articleDetail(value) {
            if (!value) {
                return;
            }
            if (value.liked == 1) {
                this.thumbsUpActive = "active";
            }
        },
        linkedUrl: function(value) {
            this.linkedUrl = value;
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

.comment-footer-section {
    .footer-operate-box {
        &.img-bottom {
            height: rem(65);
        }
        position: fixed;
        bottom: 0;
        height: rem(55);
        min-height: rem(55);
        width: 100%;
        z-index: 9000;
        .content {
            display: flex;
            background-color: #FFF;
            .left,
            .right {
                flex: 1;
                height: rem(55);
                line-height: rem(55);
                color: #3C415F;
                font-size: rem(17);
                display: flex;
                text-align: center;
                align-items: center;
                justify-content: center;
            }
            .box {
                display: flex;
                align-items: center;
                justify-content: center;
                width: rem(30);
                height: rem(50);
            }
            .left {
                .comment-icon {
                    width: rem(20);
                    height: rem(20);
                    display: inline-block;
                    vertical-align: middle;
                    background: url(../../assets/images/icon_comment.png);
                    background-size: 100% 100%;
                }
            }
            .right {
                border-left: 1px solid #E6E9EB;
                &.active {
                    color: #D2B978;
                    .likes-icon {
                        animation: comment-scale 1s ease-in-out 1;
                        -webkit-animation: comment-scale 1s ease-in-out 1;
                        background: url(../../assets/images/likes.png);
                        background-size: 100% 100%;
                    }
                }
                .likes-icon {
                    width: rem(20);
                    height: rem(20);
                    display: inline-block;
                    vertical-align: middle;
                    background: url(../../assets/images/icon_likes.png);
                    background-size: 100% 100%;
                }
            }
        }
        &:before {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background-color: #E6E9EB;
            transform: scaleY(0.5);
        }
        a:link,
        a:visited,
        a:hover,
        a:active {
            color: #3C415F;
        }
        .footer-banner {
            width: 100%;
            height: rem(65);
        }
    }
}

@keyframes comment-scale {
    50% {
        transform: scale(1.2);
    }
}

@-webkit-keyframes comment-scale {
    50% {
        -webkit-transform: scale(1.2);
    }
}
</style>