<template>
    <div class="communityList">
        <div class="communityHead">
            <HeadTitle :communityListObject="communityListObject"></HeadTitle>
        </div>
        <div class="community-item-list">
            <ListTitle :listTitle="listTitle"></ListTitle>
            <div class="community-list-box" v-load-more="loaderMore">
                <ListItem :itemTopic="communityListObjectComputed"></ListItem>
            </div>
        </div>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <FooterComm></FooterComm>
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
import loading from 'components/common/loading'
export default {
    data() {
        return {
            communityListObject: null, //社区列表
            preventRepeat: false, //防止重复获取
            showLoading: true, //显示加载动画
            listTitle: '最新帖子'
        }
    },
    components: { HeadTitle, ListTitle, ListItem, FooterComm, loading },
    mixins: [loadMore],
    mounted() {
        document.title = '社区';
        this.communityType = this.$route.params.communityType;
        this.initData(this.communityType);
    },
    computed: {
        ...mapState([
            'communityList',
            'communityHead'
        ]),
        communityListObjectComputed() {
            if (!this.communityList) {
                return null;
            } else {
                console.log("communityListObjectComputed" + this.communityList);
                return this.communityList;
            }
        }
    },
    methods: {
        async initData(communityType) {
            //初始化页面数据
            await this.getCommunityListInfo(this.communityType);
            this.communityListObject = this.communityHead;
        },
        //加载更多
        async loaderMore() {
            if (this.preventRepeat) {
                return
            }
            console.log("xxx");
            this.preventRepeat = true;
            this.showLoading = true;
            // this.offset += 10;
            //获取信息
            // let res = await getOrderList(this.userInfo.user_id, this.offset);
            // this.orderList = [...this.orderList, ...res];
            // this.hideLoading();
            // if (res.length < 10) {
            //     return
            // }
            await this.getCommunityListInfo(2);
            // this.communityListObject=this.communityList;
            let that = this;
            setTimeout(function() {
                that.preventRepeat = false;
            }, 500);

        },
        enterCommunityComment() {
            let that = this;
            //进入到社区的评论
            WebViewJavascriptBridge.ready(function(bridge) {
                bridge.getSession(function(session) {
                    var uid = session.uid;
                    var sid = session.sid;
                    console.log("sid" + sid);
                    //用户没有登录跳转到登录
                    if (!sid) {
                        that.callLoginJockey();
                    }
                });
            });
        },
        callLoginJockey() {
            WebViewJavascriptBridge.ready(function(bridge) {
                bridge.login(function(session) {
                    var uid = session.uid;
                    var sid = session.sid;
                    console.log(session);
                    if (sid == "" || sid == null) {
                        return;
                    } else {
                        //跳转到投资大赛登录页
                        window.location.reload();
                        return;
                    }
                });
            });
        },
        ...mapActions([
            'getCommunityListInfo'
        ])
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