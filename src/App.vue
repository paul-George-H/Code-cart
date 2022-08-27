<template>
  <div class="app-container">
    <!-- 使用EsHeader组件 -->
    <es-header  title="购物车案例"></es-header>

    <es-goods v-for="item in goodslist" :id="item.id" :thumb="item.goods_img" :title="item.goods_name" :price="item.goods_price" :count="item.goods_count" :checked="item.goods_state" @stateChange="onGoodsStateChange" @countChange="onGoodsCountChange"></es-goods>

    <!-- 使用EsFooter组件 -->
    <es-footer :total="total" :amount="amount" @fullChange="onFullStateChange"></es-footer>
    
  </div>
</template>

<script>
// 导入header组件
import EsHeader from './components/es-header/EsHeader.vue'
// 导入EsFooter组件
import EsFooter from './components/es-footer/EsFooter.vue'
// 导入EsGoods组件
import EsGoods from './components/es-goods/EsGoods.vue'



export default {
  name: 'MyApp',
  components: {
    // 注册EsHeader组件
    EsHeader,
    // 注册EsFooter组件
    EsFooter,
    // 注册EsGoods组件
    EsGoods,
  },
  data() {
    return {
      // 商品列表数据
      goodslist: [],
    }
  },
  // 组件实例创建完毕之后的生命周期函数
  created() {
    // 调用 methods 中的 getGoodslist 方法, 请求商品列表的数据
    this.getGoodsList()
  },
  methods: {
    // 请求商品列表的数据
    async getGoodsList() {
      // 1.通过实例this访问全局挂载的$http属性,并发起ajax数据请求
      const { data: res} = await this.$http.get('/api/cart')
      // 2.判断请求是否通过
      if(res.status !== 200) return alert('请求商品列表失败!')
      // 3.将请求到的数据储存到data中 供页面渲染期使用
      this.goodslist = res.list
    },
    // 监听选中状态的事件
    onFullStateChange(isFull) {
      // console.log(isFull)
      this.goodslist.forEach(x => x.goods_state = isFull)
    },
    // 监听商品选中状态变化的事件
    onGoodsStateChange(e) {
      // 1.根据id 进行查找(注意: e是一个对象.包含了id 和value 两个属性)
      const findResult = this.goodslist.find(x => x.id === e.id)
      if(findResult) {
        findResult.goods_state = e.value
      }
    },
    // 监听商品数量
    onGoodsCountChange(e) {
      // 根据id进行查找
      const findResult = this.goodslist.find(x => x.id === e.id)
      if(findResult) {
        findResult.goods_count = e.value
      }
    }
  },
  computed: {
    // 已勾选商品的总价
    amount() {
      // 1.定义商品总价格
      let a = 0
      // 循环累加商品总价格
      this.goodslist.filter(x => x.goods_state).forEach(x => {
        a += x.goods_price * x.goods_count
      })
      // 3.返回累加的结果
      return a
    },
    total() {
      let t = 0
      this.goodslist.filter(x => x.goods_state).forEach(x => {
        t += x.goods_count
      })
      return t
    },
  },
}

</script>

<style lang="less" scoped>
.app-container{
  padding-top: 45px;
  padding-bottom:45px;
}
</style>