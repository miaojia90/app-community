<template>
    <div class="userCenter-container">
        <UserHead :userDetail="userCenterDetail" v-if="userCenterDetail" :linkedUrl="linkedUrl"></UserHead>
        <UserTab  :userDetail="userCenterDetail" v-if="userCenterDetail" @eventUserTab="eventUserTab" :linkedUrl="linkedUrl"></UserTab>
        <ListItem :itemTopic="articleListObject" :userDetail="userCenterDetail" v-if="userCenterDetail && articleListObject && tabIndex==1" :linkedUrl="linkedUrl"></ListItem>
        <ListItem :itemTopic="discussArticleListObject" v-if="discussArticleListObject && tabIndex==2" :linkedUrl="linkedUrl"></ListItem>
        <FooterComm></FooterComm>
        <div class="footer-operate-box img-bottom" >
            <a :href="linkedUrl" class="linkedme">
               <img src="../assets/images/footerBanner.png" class="footer-banner" />
            </a>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import UserHead from 'components/userCenter/userHead';
import UserTab from 'components/userCenter/userTab';
import ListItem from 'components/communityList/listItem';
import FooterComm from 'components/footer/footer';
import { baseUrl } from '../utils/env';
import { getStore, checkUserSession, isInnerApp, linkedmeInnerApp,publishComment } from '../utils/mUtils';
import { qqShare } from '../utils/qqShare';
export default {
    data() {
        return {
            articlePage:1,//文章的页码
            articlePageSize:3,//每页显示的数量
            listTitle: '最新帖子',
            blockId:1,
            articleListObject:null,
            discussArticleListObject:null,
            userCenterDetail:null,
            linkedUrl: null,
            targetUid:null,
            tabIndex:1
        }
    },
    computed: {
        ...mapState([
            'userDetail',
            'sendArticleList',
            'discussArticleList'
        ])
    },
    methods: {
        async initData() {
            //初始化页面数据
            let args={"targetUid":this.targetUid,"page":this.articlePage,"pageSize":this.articlePageSize};
            //获取用户详情信息
            await this.getUserDetail(this.targetUid);
            await this.getSendArticleList(args);
            await this.getDiscussArticleList(args);
        },
        eventUserTab(...data){
            this.tabIndex=data[0].tabNum;
            console.log(this.tabIndex);
            if(this.tabIndex==3){
               //跳转linkedMe
               // window.location.href=this.linkedUrl;
            }
        },
        qqShare() {
            let url = window.location.href,
                viewTitle = "",
                alwayShow = 0,
                shareID = "1",
                imageUrl = this.userCenterDetail.avatar?this.userCenterDetail.avatar:"http://oss-cn-hangzhou.aliyuncs.com/jfzapp-static2/ad/fceacff8cb99a84461acb09440d2a3ed.png",
                afterClickBottonCallback = function() {};
            let content = this.userCenterDetail.introduce+"(分享自@金斧子财富APP)";
            let shareTitle = this.userCenterDetail.nickName+"的金斧子主页";
            let wxshareparamsUrl = baseUrl + "/weixin/other/wxshareparams?url=" + encodeURIComponent(window.location.href.split("#")[0]);
            qqShare(shareTitle, url, imageUrl, content, wxshareparamsUrl);
        },
        linkedMeFun(responseUrl) {
            this.linkedUrl = responseUrl;
        },
        ...mapActions([
            'getUserDetail',
            'getSendArticleList',
            'getDiscussArticleList'
        ])
    },
    mounted() {
        document.title = '';
        this.articlePage=1;
        this.articlePageSize=3;
        this.targetUid = this.$route.params.userUid;

        if(!this.articleList || this.articleList.length <= 0){
           this.initData(this.blockId);
        }else{
            this.articleListObject =this.articleList;
        }
        //linkedme
        let viewId='32', viewProperty={"uid":this.targetUid};
        linkedmeInnerApp(viewId,viewProperty,this.linkedMeFun);
    },
    watch: {
        sendArticleList(value) {
           this.articleListObject =  value;
        },
        discussArticleList(value){
           this.discussArticleListObject =  value;
        },
        userDetail(value){
            if(!value){
               return;
            }
            document.title = value.nickName;
            this.userCenterDetail= value;
            //站外分享
            this.qqShare();
        },
        linkedUrl(value) {
            this.linkedUrl = value;
        }
    },
    components: { UserHead ,UserTab,ListItem,FooterComm}
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
.footer-operate-box {
        position: fixed;
        bottom: 0;
        z-index: 9000;
        width: 100%;
    &.img-bottom{
        height:rem(65);
    }
    .footer-banner{
        width:100%;
        height:rem(65);
    }
}
</style>