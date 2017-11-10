<template>
    <section class="detail-title-container">
        <div class="item-box">
            <div class="title">
                <span class="mark top">置顶</span><span class="title-span">[私募世界] 站在前人的肩膀上，会不会看得更远</span>
            </div>
            <div class="head">
                <img class="user-headImg" src="http://www.gbtags.com/gb/laitu/40x40" />
                <span class="user-phone">186*****866</span>
                <span class="user-mark">持仓用户</span>
                <div class="delete-operate"><span>删除</span></div>
            </div>
            <div class="bottom">
                <div class="public-date"><span>2017-09-30</span></div>
                <span class="like">235</span>
                <span class="look">235</span>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: ['listTitle'],
    mounted: function() {
        document.title = this.headTitle;
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

.detail-title-container {
    .item-box {
        padding: rem(15);
        background-color: #FFF;
        .title {
            font-size: rem(25);
            color: #3C415F;
            .title-span {
                margin-left: rem(10);
                vertical-align: middle;
            }
            .mark {
                display: inline-block;
                font-size: rem(12);
                padding: rem(2) rem(5);

                vertical-align: middle;
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
            .user-headImg {
                float: left;
                width: rem(22);
                height: rem(22);
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
                margin-top: 1px;
            }
            .delete-operate {
                float: right;
                font-size: rem(14);
                color: #B4B9C3;
                line-height: rem(24);
                vertical-align: middle;
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
                    position: absolute;
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