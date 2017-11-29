<template>
    <section class="tab-section-container">
        <ul>
            <li @click="userTabClick($event,1)" class="active">
                <span>发帖 ({{userDetail.articleNum}})</span>
            </li>
            <li @click="userTabClick($event,2)">
                <span>讨论 ({{userDetail.discussedArticleNum}})</span>
            </li>
            <li @click="userTabClick($event,3)" v-if="userDetail.mngCode">
               <a :href="linkedUrl" class="linkedme">
                <span>产品 ({{userDetail.productNum}})</span>
                </a>
            </li>
        </ul>
    </section>
</template>
<script>
export default {
    props: ['userDetail','linkedUrl'],
    mounted: function() {
        // document.title = this.headTitle;
    },
    methods: {
        userTabClick(event, tabNum) {
            let obj = event.currentTarget;
            let liObject=obj.parentNode.children;
            Array.from(liObject).forEach((p)=>{
                p.classList.remove('active');
            });
            obj.classList.add('active');
            let data={
                tabNum:tabNum
            };
            this.$emit('eventUserTab',data);
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

.tab-section-container {
    margin-top: rem(10);
    ul {
        display: flex;
        font-size: rem(18);
        color: #82879B;
        height: rem(50);
        background-color: #FFF;
        text-align: center;
        overflow: hidden;
        li {
            flex: 1;
            span {
                position: relative;
                display: inline-block;
                height: rem(50);
                line-height: rem(50);
            }
            a:hover, a:visited, a:link, a:active {
                 color: #82879B;
            }
            &.active {
                span:before {
                    content:'';
                    color: #B4923B;
                    width: 100%;
                    display:inline-block;
                    position: absolute;
                    left:0;
                    right: 0;
                    bottom: 0;
                    background-color: #B4923B;
                    height: rem(2);
                }
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
}
</style>