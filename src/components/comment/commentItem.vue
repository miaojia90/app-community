<template>
    <section class="comment-item-section">
        <div class="item-content-box" v-for="(item,index) in articleComment" v-if="articleComment && articleComment.length>0">
            <div class="item-box">
                <div class="head">
                    <div class="left" :class="[item.isAuth==1?'isAuth':'']" @click="jumpToViewFun(item.uid)">
                        <img :src="item.avatar" v-if="!!item.avatar" />
                        <img src="../../assets/images/avatar_default.png" v-if="!!!item.avatar" />
                    </div>
                    <div class="center">
                        <div class="phone"><span class="phone-name">{{item.phone}}</span><span class="user-mark" v-if="!!item.userTag">{{item.userTag}}</span></div>
                        <p class="date">{{item.createdAt}}</p>
                    </div>
                    <div class="right" v-if="isInnerApp">
                        <div class="comment" @click="publishCommentFun(item.id,item.phone)">
                        </div>
                        <div class="like" v-bind:class="[item.liked==1 ? 'active' : '']" @click="giveThumbsUp($event,item.id,item.liked)">
                            <span class="like-count">{{item.likes}}</span>
                        </div>
                    </div>
                    <a :href="linkedUrl" v-if="!isInnerApp" class="linkedme">
                        <div class="right">
                            <div class="comment">
                            </div>
                            <div class="like" v-bind:class="[item.liked==1 ? 'active' : '']">
                                <span class="like-count">{{item.likes}}</span>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="content three-line-break">
                    {{item.content}}
                </div>
                <div class="content three-line-break replyContent" v-if="!!item.replyCommentContent">
                    {{item.replyCommentPhone}}:{{item.replyCommentContent}}
                </div>
            </div>
        </div>
        <div class="open-app-area" v-if="!isInnerApp && articleDetail.commentNum>3">
            <a :href="linkedUrl" class="linkedme">打开APP,查看更多评论</a>
        </div>
        <!-- 没有评论的区域 -->
        <div class="no-comment-item" v-if="articleDetail.commentNum==0">
            <div v-if="isInnerApp" @click="publishCommentFun()">
                <img src="../../assets/images/rob_sofa.png" />
                <p>评论为空，抢个沙发</p>
            </div>
            <div v-if="!isInnerApp">
                <a :href="linkedUrl" class="linkedme">
                <img src="../../assets/images/rob_sofa.png" />
                </a>
                <p>评论为空，抢个沙发</p>
            </div>
        </div>
        <toast :toastInfo="toastInfo" v-if="toastFlag"></toast>
    </section>
</template>
<script>
import {
    linkedmeKey
} from '../../utils/env.js';
import { mapState, mapActions } from 'vuex';
import { getStore, checkUserSession, isInnerApp, linkedmeFun, publishComment,jumpToView } from '../../utils/mUtils';
import toast from '../common/toast';
export default {
    data() {
        return {
            isInnerApp: isInnerApp(), //防止重复获取
            linkedUrl: null,
            toastInfo: '',
            toastFlag: false,
            obj:null,
            tempItemId:null
        }
    },
    props: ['articleComment', 'articleDetail'],
    methods: {
        giveThumbsUp(event,id, liked) {
            var obj=event.currentTarget;
            if (liked == 1 || obj.className=="like active") {
                return;
            }
            this.obj=obj;
            console.log("点赞",obj);
            //点赞
            var that = this;
            this.tempItemId=id;
            //判断是否在APP中还是在H5页面
            if (this.isInnerApp) {
                //在APP中
                //进入到社区的评论
                checkUserSession(function() {
                    that.callThumbsUpInterface(id);
                });
            }
        },
        jumpToViewFun(uid) {
            if (!uid) {
                return;
            }
            if (!this.isInnerApp) {
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
        //发布评论
        publishCommentFun(CommentId,userName) {
            let code = "",
                type = "",
                replyCommentId = "",
                placeholder = "回复@"+userName+"";
            code = this.articleDetail.id;
            type = "community";
            replyCommentId = CommentId;
            var that = this;
            publishComment(code, type, replyCommentId, placeholder, function() {
                that.publishCommentCallBack();
            });
        },
        publishCommentCallBack() {
            var dataCallBack = {
                state: 'success'
            };
            this.$emit('eventCommentCallBack', dataCallBack);
        },
        //调用点赞的接口
        async callThumbsUpInterface(id) {
            let sid = getStore("sessionSid");
            let uid = getStore("sessionUid");
            let commentId = id;
            let args = { "commentId": commentId, "uid": uid, "sid": sid };
            console.log("argsxx", args);
            await this.commentThumbsUpFun(args);
        },
        likeCallBack(obj){
            if(obj.children[0].innerText.indexOf('万')>-1){

            }else{
                obj.children[0].innerText=parseInt(obj.children[0].innerText)+1;
            }
            obj.classList.add('active');
        },
        //linkedMe
        linkedMeFun(responseUrl) {
            this.linkedUrl = responseUrl;
        },
        ...mapActions([
            'commentThumbsUpFun'
        ])
    },
    components: { toast },
    mounted: function() {
        //linkedme
        linkedmeFun(this.linkedMeFun);
    },
    computed: {
        ...mapState([
            'commentLikeInfo'
        ])
    },
    watch: {
        commentLikeInfo: function(value) {
            console.log("点赞返回的值", value);
            if (value.error) {
                //错误信息
                this.toastInfo = value.error.message;
            } else {
                //判断成功的标志
                if (value >0) {
                    this.toastInfo = "点赞成功！";
                    //更新数据 遍历数组找到item ID =xxx的对象，修改数据值
                    console.log(this.articleComment);
                    for(let i=0;i<this.articleComment.length;i++){
                          if(this.articleComment[i].id==this.tempItemId){
                               this.articleComment[i].liked=1;
                               if(this.articleComment[i].likes.indexOf('万')>-1){
                                }else{
                                    this.articleComment[i].likes=parseInt(this.articleComment[i].likes)+1;
                                }
                                break;
                          }
                    }
                }
            }
            this.toastFlag = true;
            var that = this;
            setTimeout(function() {
                that.toastFlag = false;
                that.toastInfo = "";
            }, 3000)
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

.comment-item-section {
    padding: rem(15);
    background-color: #FFF;
    .item-content-box {
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
    }
    .item-box {
        padding: rem(15) 0;
        .head {
            display: flex;
            align-items: center;
            .left {
                position: relative;
                width: rem(35);
                height: rem(35);
                margin-right: rem(10);
                img {
                    width: rem(35);
                    height: rem(35);
                    border-radius: 50%;
                }
                &.isAuth {
                    &:after {
                        content: '';
                        width: rem(10);
                        height: rem(10);
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        background: url(../../assets/images/v_big_normal.png) no-repeat center top;
                        background-size: 100% 100%;
                    }
                }
            }
            .center {
                flex: 1;
                font-size: rem(17);
                .phone {
                    font-size: rem(17);
                    color: #555A73;
                    height: rem(22);
                    line-height: rem(22);
                    max-width: rem(200);
                    .phone-name{
                        float: left;
                        max-width: rem(120);
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .user-mark {
                        float: left;
                        font-size: rem(12);
                        color: #d2b978;
                        height: rem(18);
                        line-height: rem(18);
                        margin-left: rem(10);
                        padding: 0 rem(6);
                        border: 1px solid #d2b978;
                        border-radius: rem(12);
                    }
                }
                .date {
                    color: #ADB0BC;
                    font-size: rem(12);
                    height: rem(18);
                    line-height: rem(18);
                }
            }
            .right {
                width: rem(100);
                display: flex;
                .comment {
                    flex: 1;
                    &:after {
                        content: '';
                        display: block;
                        width: rem(20);
                        height: rem(20);
                        margin: 0 auto;
                        background: url(../../assets/images/answer.png) no-repeat center top;
                        background-size: 100% 100%;
                    }
                }
                .like {
                    flex: 1;
                    &:before {
                        margin: 0 auto;
                        content: '';
                        display: block;
                        width: rem(20);
                        height: rem(20);
                        background: url(../../assets/images/likes_nor.png) no-repeat center top;
                        background-size: 100% 100%;
                    }
                    .like-count {
                        display: block;
                        text-align: center;
                        line-height: rem(20);
                        font-size: rem(12);
                        color: #ADB0BC;
                    }
                    &.active {
                        &:before {
                            animation: comment-scale 1s ease-in-out 1;
                            -webkit-animation: comment-scale 1s ease-in-out 1;
                            background: url(../../assets/images/likes.png) no-repeat center top;
                            background-size: 100% 100%;
                        }
                        .like-count {
                            color: #D2B978;
                        }
                    }
                }
            }
        }
        .content {
            color: #0A1437;
            font-size: rem(16);
            line-height: rem(24);
            margin-left: rem(45);
            margin-top: rem(10);
            &.replyContent {
                color: #555a73;
                background-color: #f4f5f7;
                padding: rem(10);
                border-radius: rem(10);
            }
        }
    }
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
    .no-comment-item {
        background-color: #FFF;
        padding: rem(30) 0;
        font-size: rem(14);
        img {
            width: rem(100);
            height: rem(100);
            margin: 0 auto;
        }
        p {
            text-align: center;
            color: #82879B;
            height: rem(30);
            line-height: rem(30);
            font-size: rem(16);
        }
    }
}

.open-app-area {
    width: 100%;
    height: rem(40);
    line-height: rem(40);
    color: #d2b978;
    font-size: rem(16);
    text-align: center;
    background-color: #FFF;
    a:link,
    a:visited,
    a:hover,
    a:active {
        color: #d2b978;
    }
}

@keyframes comment-scale {
    50% {
        transform: scale(1.1);
    }
}

@-webkit-keyframes comment-scale {
    50% {
        -webkit-transform: scale(1.1);
    }
}
</style>