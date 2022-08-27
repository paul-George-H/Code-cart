<template>
    <div class="footer-container">
        <!-- 全选区域 -->
        <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="fullCheck" :checked="isfull" @change="onCheckBoxChange">
            <label class="custom-control-label" for="fullCheck">全选</label>
        </div>
        <!-- 合计区域 -->
        <div>
            <span>合计:</span>
            <!-- 将amount保留两位小数 -->
            <span class="amount">￥{{ amount.toFixed(2) }}</span>
        </div>
        <!-- 结算按钮 -->
        <button type="button" class="btn btn-primary btn-settle" :disabled="total === 0">结算({{ total }})</button>
    </div>
</template>

<script>
export default {
    name: 'EsFooter',
    emits: ['fullChange'],
    props: {
        // 勾选商品的总价格
        amount: {
            type:Number,
            default: 0,
        },
        // 已勾选商品的总数
        total:{
            type: Number,
            default: 0,
        },
        // 全选按钮的选择状态
        isfull: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        // 监听复选框选中状态的变化
        onCheckBoxChange(e) {
            // e.target.checked 是复选框最新的选中状态
            // 触发自定义事件
            // console.log(e.target.checked)
            this.$emit('fullChange',e.target.checked)
        }
    }
}
</script>

<style lang="less" scoped>
.footer-container{
    width: 100%;
    height: 50px;
    background-color: white;
    border-top: 1px solid #efefef;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

}

.amount{
    font-weight: bold;
    color: red;
}

.btn-settle{
    min-width: 90px;
    height: 38px;
    border-radius: 19px;
}
</style>