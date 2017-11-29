<template>
    <div class="communityList">
       <!-- 文章存在 -->
       <div class="article-exist" v-if="!(articleDetailError && articleDetailError.error)">
            <div class="communityHead">
                <DetailTitle :articleDetail="articleDetail" :uid="uid" @eventModalDialog="eventModalDialog" @eventFollowCallBack="eventFollowCallBack" :linkedUrl="linkedUrl"></DetailTitle>
            </div>
            <div class="community-detail-content">
                <DetailContent :articleDetail="articleDetail">
                </DetailContent>
            </div>
            <div class="community-item-list" id="communityCommentID">
                <ListTitle :listTitle="listTitle" :type="titleType" :articleDetail="articleDetail" v-if="articleDetail"></ListTitle>
                <div class="comment-list-box" v-load-more="loaderMore">
                    <CommentItem :articleComment="articleCommentObject" :articleDetail="articleDetail" @eventCommentCallBack="eventCallBack" ></CommentItem>
                </div>
            </div>
            <transition name="loading">
                <loading v-show="articleDetail.commentNum!=0  && showLoading && isCheckApp"></loading>
            </transition>
            <FooterComm v-show="!isCheckApp || articleDetail.commentNum==0 || !showLoading"></FooterComm>
            <CommentFooter :articleDetail="articleDetail" @eventCallBack="eventCallBack"></CommentFooter>
       </div>
        <!-- 文章不存在 -->
       <div class="article-no-exist" v-if="articleDetailError && articleDetailError.error">
            <img src="../assets/images/notfund_article.png" />
            <p>这个帖子找不到了...</p>
       </div>
       <modalDialog :modalDialogInfo="modalDialogInfo" v-if="modalDialogFlag" :articleDetail="articleDetail" @eventIsDelete="eventIsDelete"></modalDialog>
       <toast :toastInfo="toastInfo" v-if="toastFlag"></toast>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import DetailTitle from 'components/communityDetail/detailTitle';
import DetailContent from 'components/communityDetail/detailContent';
import ListTitle from 'components/communityList/listTitle';
import CommentItem from 'components/comment/commentItem';
import FooterComm from 'components/footer/footer';
import CommentFooter from 'components/comment/commentFooter';
import { showBack, animate, innerAppShare } from '../utils/mUtils';
import { qqShare } from '../utils/qqShare';
import { baseUrl } from '../utils/env';
import { loadMore } from 'components/common/mixin';
import loading from 'components/common/loading';
import modalDialog from 'components/common/modalDialog';
import toast from 'components/common/toast';
import { getStore, checkUserSession, isInnerApp, linkedmeFun, publishComment, getUserSession,jumpToView,closeWebView,enterDetailPageEvent } from '../utils/mUtils';
export default {
    data() {
        return {
            preventRepeat: false, //防止重复获取
            showLoading: false, //显示加载动画
            commentPage: 1, //文章的页码
            commentPageSize: 30, //每页显示的数量          
            titleType: 'comment',
            commentCount: '0',
            articleCommentObject: null,
            isCheckApp:isInnerApp(),
            listTitle: '回复',
            uid: getStore("sessionUid"),
            flag:0,
            modalDialogFlag:false,
            modalDialogInfo:'是否确认删除？',
            toastInfo:'',
            toastFlag:false,
            linkedUrl: null
        }
    },
    mixins: [loadMore],
    computed: {
        ...mapState([
            'articleDetail',
            'articleComment',
            'commentPageInfo',
            'articleDetailError',
            'articleDeleteInfo'
        ])
    },
    methods: {
        async initData(articleId) {
            this.uid = getStore("sessionUid");
            let articleArgs = {
                "articleId": articleId,
                "uid": getStore("sessionUid"),
                "sid": getStore("sessionSid"),
            }
            await this.getArticleDetail(articleArgs);
            var temPageSize = 30;
            if (isInnerApp()) {
                temPageSize = 30;
            } else {
                console.log("temPageSize");
                temPageSize = 3;
            }
            let args = {
                "articleId": articleId,
                "page": 1,
                "pageSize": temPageSize,
                "uid": getStore("sessionUid"),
                "sid": getStore("sessionSid"),
            };
            await this.getArticleComment(args);
            //分享 站内分享 站外分享
            // this.showRightShareButton();
        },
        //加载更多
        async loaderMore() {
            let that = this;
            if (!isInnerApp()) {
                return;
            }
            if (this.preventRepeat) {
                return
            }
            if(this.commentPageInfo.count==0 ){
               return;
            }
            if (this.commentPageInfo.current == this.commentPageInfo.total) {
                setTimeout(function(){
                   that.preventRepeat = false;
                   that.showLoading = false;
                },2000);
                return;
            }
            console.log("加载更多");
            this.preventRepeat = true;
            this.showLoading = true;
            if(this.commentPageInfo.count<30){
                setTimeout(function(){
                   that.preventRepeat = false;
                   that.showLoading = false;
                },2000);
                return;
            } 
            let args = { "articleId": this.articleId, "page": parseInt(this.commentPageInfo.current) + 1, "pageSize": this.commentPageInfo.size, "uid": getStore("sessionUid"), "sid": getStore("sessionSid") };
            await this.getArticleComment(args);
            setTimeout(function() {
                that.preventRepeat = false;
            }, 2000);
        },
        showRightShareButton() {
            let url = window.location.href,
                viewTitle = "",
                alwayShow = 0,
                shareID = "1",
                imageUrl = "http://oss-cn-hangzhou.aliyuncs.com/jfzapp-static2/ad/fceacff8cb99a84461acb09440d2a3ed.png",
                afterClickBottonCallback = function() {};
            let content = "在这里，和私募大咖聊投资。分享自@金斧子私募社区平台";
            let shareTitle = this.articleDetail.title;
            innerAppShare(viewTitle, shareTitle, content, url, imageUrl, shareID, alwayShow, afterClickBottonCallback);
            let wxshareparamsUrl = baseUrl+ "/weixin/other/wxshareparams?url=" + encodeURIComponent(window.location.href.split("#")[0]);
            qqShare(shareTitle, url, imageUrl, content, wxshareparamsUrl);
        },
        eventCallBack(...data) {
            if (data[0].state == "success") {
                this.preventRepeat=false; //防止重复获取
                this.showLoading=true; //显示加载动画
                this.initData(this.articleId);
                window.scrollTo(0,document.getElementById("communityCommentID").offsetTop);
            }
        },
        eventModalDialog(...data){
            this.modalDialogFlag=true;
            this.modalDialogInfo='是否确认删除？';
        },
        eventFollowCallBack(...data){
           this.toastFlag=true;
           this.toastInfo=data[0].message;
           var that =this;
           let articleArgs = {
                "articleId": this.articleId,
                "uid": getStore("sessionUid"),
                "sid": getStore("sessionSid"),
            }
            this.getArticleDetail(articleArgs);
           setTimeout(function(){
               that.toastFlag=false;
           },3000);
        },
        eventIsDelete(...data){
            if(data[0].type == "1"){
              this.deleteArticle();
            }else{
              this.modalDialogFlag=false;
            }
        },
        deleteArticle(){
            var that = this;
            checkUserSession(function() {
                let args = {
                    "uid": getStore("sessionUid"),
                    "sid": getStore("sessionSid"),
                    "articleId": that.articleDetail.id
                };
                that.deleteArticleFun(args);
            });
        },
        //linkedMe
        linkedMeFun(responseUrl) {
            this.linkedUrl = responseUrl;
        },
        ...mapActions([
            'getArticleDetail',
            'getArticleComment',
            'deleteArticleFun'
        ])
    },
    created(){
        document.title = '帖子详情';
    },
    mounted() {
        document.title = '帖子详情';
        this.articleId = this.$route.params.articleId;
        this.articlePage = 1;
        this.articlePageSize = 30;
        //linkedme
        linkedmeFun(this.linkedMeFun);
        var that = this;
        if (isInnerApp()) {
            getUserSession(function() {
                if (!that.articleComment || that.articleComment.length <= 0) {
                    that.initData(that.articleId);
                } else {
                    that.articleCommentObject = that.articleComment;
                }

            });
        } else {
            if (!that.articleComment || that.articleComment.length <= 0) {
                this.initData(this.articleId);
            } else {
                that.articleCommentObject = that.articleComment;
            }

        }
    },
    watch: {
        articleComment: function(value) {
            if (!value) {
                return;
            }
            this.articleCommentObject = value;
        },
        commentPageInfo(value){
            if (!value) {
                return;
            } 
            if(this.commentPageInfo.count>30){
               this.showLoading=true;
            } 
        },
        articleDetail: function(value) {
            if (!value) {
                return;
            }
            this.commentCount = value.commentNum;
            if(this.flag==0){
             //站内分享
             this.showRightShareButton();
             this.flag++;
            }
        },
        articleDeleteInfo:function(value){
            //查看是否删除成功
            if (value.deleteStatus && value.deleteStatus==1) {
               this.toastInfo='删除成功';
               this.modalDialogFlag=false;
            }else{
               this.toastInfo='删除失败';
               // 关闭弹出弹出层 
               this.modalDialogFlag=false;
            }
           this.toastFlag=true;
           var that =this;
           setTimeout(function(){
               that.toastFlag=false;
               if (value.deleteStatus && value.deleteStatus==1) {
                   setTimeout(function(){
                     closeWebView();
                   },1000);
               }
           },3000);
        },
        uid: function(value) {
            if (!value) {
                return;
            }
            this.uid = value;
        },
        linkedUrl: function(value) {
            this.linkedUrl = value;
        }
    },
    components: { DetailTitle, DetailContent, ListTitle, CommentItem, CommentFooter, FooterComm, loading,modalDialog ,toast}
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

.community-item-list {
    margin-top: rem(10);
}
.article-no-exist{
    img{
        width: rem(110);
        height: rem(110);
        margin:rem(100) auto 0 auto;
    }
    p{
        height: rem(50);
        line-height: rem(50);
        text-align: center;
        color:#82879B;
        font-size: rem(16);
    }
}
</style>