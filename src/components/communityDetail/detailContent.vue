<template>
    <section class="detail-content-section">
        <div class="content-box" v-html="articleDetail.content">
        </div>
        <img :src="articleDetail.imgUrl" v-if="articleDetail.imgUrl" />
    </section>
</template>
<script>
export default {
    props: ['articleDetail'],
    mounted: function() {}
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

.detail-content-section {
    color: #3C415F;
    font-size: rem(18);
    padding: 0 rem(15) rem(15) rem(15);
    background-color: #FFF;
    .content-box {
        padding-top: rem(15);
        line-height: rem(30);
        word-wrap: break-word;
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