<template>
    <div class="modal-dialog-container" v-if="dialogShow">
        <div class="mark"></div>
        <div class="modal-dialog-box">
            <p class="toast-text">{{modalDialogInfo}}</p>
            <div class="footer-operate">
                <div v-on:click='closeDialog'>取消</div>
                <div v-on:click='closeWebView'>确定</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { getStore, checkUserSession, isInnerApp, linkedmeFun, publishComment, getUserSession,closeWebView } from '../../utils/mUtils';
export default {
    data() {
        return {
            dialogShow: true
        }
    },
    computed: {
        ...mapState([
            'articleDeleteInfo'
        ])
    },
    methods: {
        closeDialog() {
            // this.dialogShow = false;
            let dataCallBack={
                type:0
            };
            this.$emit('eventIsDelete',dataCallBack);
        },
        closeWebView() {
            //执行删除操作
            let dataCallBack={
                type:1
            };
            this.$emit('eventIsDelete',dataCallBack);
        },
        ...mapActions([
            'deleteArticleFun'
        ])
    },
    watch: {

    },
    props: ['modalDialogInfo', 'articleDetail'],
    mounted() {

    }
}
</script>
<style lang="scss" scoped>
$r_750:640/750/2/32;
@function rem($px) {
    @return $px * $r_750 * 2rem;
}

// 滚动loading
.modal-dialog-container {
    .mark {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 10000;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .modal-dialog-box {
        width: rem(270);
        height: rem(105);
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: rem(-135);
        margin-top: rem(-50);
        background-color: #FFF;
        border-radius: rem(15);
        z-index: 10001;
    }

    .toast-text {
        color: #555A73;
        font-size: rem(17);
        height: rem(55);
        line-height: rem(55);
        text-align: center;
        padding: 0 rem(10);
    }
    .footer-operate {
        height: rem(50);
        line-height: rem(50);
        display: flex;
        border-top: 1px solid #B4B9C3;
        div {
            flex: 1;
            color: #D2B978;
            font-size: rem(17);
            text-align: center;
            height: rem(50);
            line-height: rem(50);
            &:nth-child(1) {
                border-right: 1px solid #B4B9C3;
            }
        }
    }
}
</style>