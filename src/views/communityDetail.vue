<template>
    <div class="communityList">
        <div class="communityHead">
            <DetailTitle :headTitle="headTitle" :headDesc="headDesc"></DetailTitle>
        </div>
        <div class="community-detail-content">
        <DetailContent></DetailContent>
        </div>
        <div class="community-item-list">
            <ListTitle :listTitle="listTitle" :type="titleType" :data="commetCount"></ListTitle>
            <CommentItem ></CommentItem>
        </div>
        <FooterComm></FooterComm>
        <FooterInput></FooterInput>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import DetailTitle from 'components/communityDetail/detailTitle';
import DetailContent from 'components/communityDetail/detailContent';
import ListTitle from 'components/communityList/listTitle';
import CommentItem from 'components/comment/commentItem';
import FooterComm from 'components/footer/footer';
import FooterInput from 'components/footer/footerInput';
export default {
    data() {
        return {
            headTitle: '海外',
            headDesc: '海外版块介绍，有一种在结合众多风险个体描述的基础上。',
            listTitle: '回复',
            titleType:'comment',
            commetCount:'12',
            content: ''
        }
    },
    methods: {
    },
    mounted() {
        document.title = '社区';
    },

    components: { DetailTitle, DetailContent, ListTitle ,CommentItem,FooterInput,FooterComm}
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
</style>