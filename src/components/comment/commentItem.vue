<template>
    <section class="comment-item-section">
        <div class="item-box">
            <div class="head">
                <div class="left">
                    <img src="http://www.gbtags.com/gb/laitu/70x70" />
                </div>
                <div class="center">
                    <p class="phone"><span>****4521</span><span class="user-mark">持仓用户</span></p>
                    <p class="date"><span>2017-11-03 16:09</span></p>
                </div>
                <div class="right">
                    <div class="comment">
                    </div>
                    <div class="like">
                        <span class="like-count">123</span>
                    </div>
                </div>
            </div>
            <div class="content three-line-break">
                那么多保险产品，除了普通的生活类，理财型投资选哪个比较好理财型投资选哪个比较好理财型投资选哪个比较好普通的生活类，理财型投资选哪个比较好理财型投资选哪个比较好理？
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: ['listTitle'],
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

.comment-item-section {
    .item-box {
        padding: rem(15);
        background-color: #FFF;
        .head {
            display: flex;
            align-items: center;
            .left {
                width: rem(35);
                height: rem(35);
                margin-right: rem(10);
                img {
                    width: rem(35);
                    height: rem(35);
                    border-radius: 50%;
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
                    vertical-align: middle;
                    .user-mark {
                        display: inline-block;
                        font-size: rem(12);
                        color: #d2b978;
                        height: rem(20);
                        line-height: rem(20);
                        margin-left: rem(10);
                        padding: 0 rem(6);
                        vertical-align: middle;
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
                        position: absolute;
                        animation: comment-scale 1s ease-in-out 1;
                        -webkit-animation: comment-scale 1s ease-in-out 1;
                        &:before {
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