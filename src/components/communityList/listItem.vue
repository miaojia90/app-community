<template>
    <section class="list-item-section">
        <div class="item-box" @click="enterCommunityDetail" v-for="(item,index) in itemTopic">
            <div class="head">
                <img class="user-headImg" src="http://www.gbtags.com/gb/laitu/40x40" />
                <span class="user-name">{{item.userName}}</span>
                <span class="user-mark">{{item.mark}}</span>
                <span class="public-date">{{item.date}}</span>
            </div>
            <div class="content two-line-break">
                {{item.content}}
            </div>
            <div class="bottom">
                <span class="mark top">置顶</span>
                <span class="comment">235</span>
                <span class="look">235</span>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: ['listTitle', "itemTopic"],
    methods: {
        //选中的答案信息
        enterCommunityDetail() {
            this.$router.push({ name: 'communityDetail', params: { id: '1' } })
        }
    },
    mounted: function() {

    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

.list-item-section {
    background-color: #FFF;
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
            .user-headImg {
                float: left;
                width: rem(22);
                height: rem(22);
                margin: 1px 0;
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