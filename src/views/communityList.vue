<template>
    <div class="communityList">
        <div class="communityHead">
            <HeadTitle :blockDetail="blockDetail"></HeadTitle>
        </div>
        <div class="community-item-list">
            <ListTitle :listTitle="titleName"></ListTitle>
            <div class="community-list-box" v-load-more="loaderMore">
                <ListItem :itemTopic="articleListObject"></ListItem>
            </div>
        </div>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <FooterComm v-show="!showLoading"></FooterComm>
        <div class="publish-comment" @click="enterCommunityComment">
        </div>
    </div>
</template>
<script>
import HeadTitle from 'components/communityList/headTitle';
import ListTitle from 'components/communityList/listTitle';
import ListItem from 'components/communityList/listItem';
import FooterComm from 'components/footer/footer';
import { mapState, mapActions } from 'vuex';
import { showBack, animate } from '../utils/mUtils';
import { loadMore } from 'components/common/mixin';
import loading from 'components/common/loading';
export default {
    data() {
        return {
            preventRepeat: false, //防止重复获取
            showLoading: false, //显示加载动画
            articlePage:1,//文章的页码
            articlePageSize:10,//每页显示的数量
            listTitle: '最新帖子',
            blockId:1,
            articleListObject:null
        }
    },
    components: { HeadTitle, ListTitle, ListItem, FooterComm, loading },
    mixins: [loadMore],
    mounted() {
        document.title = '社区';
        this.blockId = this.$route.params.blockId;
        this.articlePage=1;
        this.articlePageSize=10;
        console.log(this.articleList);
        if(!this.articleList || this.articleList.length <= 0){
           this.initData(this.blockId);
        }else{
            this.articleListObject =this.articleList;
        }
    },
    computed: {
        ...mapState([
            'blockDetail',
            'articleList',
            'articlePageInfo',
            'titleName'
        ])
    },
    methods: {
        async initData(blockId) {
            //初始化页面数据
            let args={"blockId":blockId,"page":this.articlePage,"pageSize":this.articlePageSize};
            await this.getArticleList(args);
            await this.getBlockDetail(blockId);
        },
        //加载更多
        async loaderMore() {
            if (this.preventRepeat) {
                return
            }
            if(this.articlePageInfo.current==this.articlePageInfo.total){
                this.showLoading=false;
                return;
            }
            this.preventRepeat = true;
            this.showLoading = true;
            let args={"blockId":this.blockId,"page":parseInt(this.articlePageInfo.current)+1,"pageSize":this.articlePageInfo.size};
            await this.getArticleList(args);
            let that = this;
            setTimeout(function() {
                that.preventRepeat = false;
            }, 500);

        },
        enterCommunityComment() {
        },
        ...mapActions([
            'getArticleList',
            'getBlockDetail'
        ])
    },
    watch: {
        articleList: function (value) {
           this.articleListObject =  value;
        }
    }
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

.publish-comment {
    position: fixed;
    bottom: rem(50);
    right: rem(30);
    z-index: 1000;
    ;
    width: rem(54);
    height: rem(54);
    background: url(../assets/images/write_comment.png) no-repeat center top;
    background-size: 100% 100%;
}
</style>