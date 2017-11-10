<template>
    <section class="detail-content-section">
    <div class="content-box">
     2016年以来，A股市场共有300多家新股首发上市。从个股的行业分布，募资金额以及中签率的角度进行剖析可以发现，新股上市以来的连续一字板的个数与募资金额、中签率有一定的负相关关系；行业间新股收益率差距大，计算机、有色金属、交通运输行业新股一字板数量居前。
由于当前新股申购不再冻结资金，且新股上市必涨，因此，基本上是全民打新，每只新股的有效申购数量都超过1000万户，新股中签率基本都在千分之一以下。从下图也可以看出，新股中签率与发行数量无明显关系。
 <img class="user-headImg" src="http://www.gbtags.com/gb/laitu/750x400" />
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
.detail-content-section{
    color:#3C415F;
    font-size: rem(18);
    padding: 0 rem(15) rem(15) rem(15);
    background-color:#FFF;
    .content-box{
       padding-top: rem(15); 
       line-height: rem(30);
    }
    &:before {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: #E6E9EB;
        transform: scaleY(0.5);
    }
}
</style>