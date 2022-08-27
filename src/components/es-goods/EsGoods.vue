<template>
<div class="goods-container">
    <!--左侧图片区域-->
    <div class="left">
        <!-- 复选框 -->
        <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" :id="id" :checked="checked" @change="onCheckBoxChange">
            <label class="custom-control-label" :for="id">
                <!--商品的缩略图-->
                <img :src="thumb" alt="商品图片" class="thumb"/>
            </label>
        </div>
        
    </div>
        <!--右侧信息区域-->
        <div class="right">
        <!--商品名称-->
        <div class="top">{{ title }}</div>
        <div class="bottom">
        <!--商品价格-->
        <div class="price">￥{{ price.toFixed(2) }}</div>
        <!--商品数量-->
        <div class="count">
            <es-counter :num="count" :min="1" @numChange="getNumber"></es-counter>
        </div>
        </div>
    </div>
</div>
</template>

<script>
import EsCounter from '../es-counter/EsCounter.vue'

export default {
    
    name: 'EsGoods',
    components: {
        EsCounter,
    },
    emits: ['stateChange','countChange'],
    props: {
        // 唯一的key值
        id: {
            type: [String, Number],
            required: true,
        },
        // 1.商品的缩略图
        thumb: {
            type: String,
            required: true
        },
        // 2.商品的略缩图
        title: {
            type: String,
            required: true,
        },
        // 3.单价
        price: {
            type: Number,
            required: true,
        },
        // 4.商品的数量
        count: {
            type: Number,
            required: true
        },
        // 5.商品勾选状态
        checked: {
            type: Boolean,
            required: true,
        }
    },
    methods: {
        // 监听复选框状态选中状态变化的事件
        onCheckBoxChange(e) {
            // console.log(e.target.checked)
            this.$emit('stateChange',{
                id: this.id,
                value: e.target.checked,
            })
        },
        // 监听数量变化的事件
        getNumber(num) {
            // 触发自定义事件 向外传递数据对象 {id, value}
            this.$emit('countChange',{
                // 商品的id
                id: this.id,
                // 最新的数量
                value: num,
            })
        },
    },
}
</script>

<style lang="less" scoped>
.goods-container {
    + .goods-container {
        border-top:1px solid #efefef;
    }
    display: flex;
    padding: 10px;
    // 左侧图片的样式
    .left {
        margin-right: 10px;
    // 商品图片
        .thumb {
            display: block;
            width: 100px;
            height: 100px;
            background-color: #efefef;
        }
    }
 // 右侧商品名称、单价、数量的样式
    .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        .top {
            font-weight: bold;
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
        .price {
            color: red;
            font-weight: bold;
        }
        }
    }
}

.custom-control-label::before,
.custom-control-label::after{
    top: 3.4rem;
}
</style>