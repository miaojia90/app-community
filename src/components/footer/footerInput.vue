<template>
    <footer class="footer-input-container">
        <div class="comment-area-wrap">
            <div class="comment-area">
                <div class="input">说说你的想法</div>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
    props: ['listTitle', 'type', 'data'],
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

.footer-input-container {
    .comment-area-wrap {
        height: rem(50);
    }
    .comment-area {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        display: flex;
        font-size: rem(18);
        text-align: center;
        background-color: #e6e9eb;
        padding: rem(5) rem(10);
    }
    .comment-area .input {
        flex: 1;
        display: block;
        color: #b4b9c3;
        text-align: left;
        border: none;
        border-radius: 9999px;
        background-color: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height: rem(35);
        line-height: rem(35);
        padding: 0 rem(15);
    }
}
</style>