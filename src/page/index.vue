<template>
    <div id="">
        <Header></Header>
        <div class="cart cart_title">
            <ul>
                <li>
                    <input type="checkbox" id="select_all" v-model="allChecked">
                    <!--@click="selectAllProduct()"-->
                    <label for="select_all">全选</label>
                    <!--:class="{'checked':checkedAllFlag}"-->
                </li>
                <li>商品信息</li>
                <li>单价</li>
                <li>数量</li>
                <li>金额</li>
                <li>操作</li>
            </ul>
        </div>
        <div v-for="(item, index) in itemList" class="cart">
            <ul>
                <li>
                    <input type="checkbox" v-bind:id="item.productId" v-bind:value="item.productId" v-model="item.checked">
                    <label style="width: 20px; height: 20px;display: inline-block" v-bind:for="item.productId"></label>
                    <!--v-bind:class="{'checked':item.selected}"-->
                </li>
                <li>
                    <img src="" :src="imgSrc(index)" alt="">
                    <blockquote>
                        <p>{{item.productName}}</p>
                        <span>{{item.productDescription}}</span>
                    </blockquote>
                </li>
                <li>{{item.productPrice}}</li>
                <li>
                    <!--<input type="number" min="0" max="10">-->
                    <button style="padding:1px 4px" @click="amountChange(item, -1)">-</button>
                    <input id="index" type="number" v-model="item.counter" v-numberOnly>
                    <button style="padding:1px 4px" @click="amountChange(item, 1)">+</button>
                </li>
                <li>{{item.productPrice*item.counter}}</li>
                <li><a href="JavaScript:void(0);" @click="deleteConfirm(item)">删除</a></li>
            </ul>
        </div>
        <div class="cart_total">
            <p>合计：￥<span>{{calTotalCost}}</span></p>
            <a href="javascript:void(0)" :href="toLink(calTotalAmount)" :class="{'disabled': isActive}" >结算(&nbsp;{{calTotalAmount}}&nbsp;)</a>
        </div>
        <div class="delete_confirm delete_show" v-if="deleteFlag" v-bind:class="{'delete_show':deleteFlag}">
            <ul>
                <li><p>删除宝贝</p></li>
                <li><span>确认要删除该宝贝吗？</span></li>
                <li>
                    <a class="dialog_btn dialog_btn_confirm" href="javascript:void(0)" @click="removeProduct">确认</a>
                    <a class="dialog_btn dialog_btn_cxl" href="javascript:void(0)" @click="deleteFlag=false">关闭</a>
                </li>
            </ul>

        </div>


        <Footer></Footer>
    </div>
</template>

<script>
  import Header from '../components/header.vue'
  import Footer from '../components/footer.vue'

  export default {
//    name: 'app',
    components: { Header, Footer },
    data(){
      return{
        itemList       : [],
        currentProduct : '',
        deleteFlag     : false,
        isActive       : true,
        hasError       : 0,
        url            : ''
      }
    },

    mounted    : function() {
      this.getData()
      //Q： 钩子的用法
    },
    directives : {
      numberOnly : {
        bind   : function(el) {
          el.handler = function() {
            var formatVal = /^\+[1-9]*$/
            var val       = el.value.toString()
            if (!formatVal.test(val)) {
              var reg  = new RegExp(val, 'g')
              el.value = el.value.replace(reg, 1)
            }
          }
          el.addEventListener('input', el.handler)
        },
        unbind : function(el) {
          el.removeEventListener('input', el.handler)
        }
      }
    },
    computed   : {
      allChecked   : {
        get : function() {
          return this.checkedCount==this.itemList.length
        },
        set : function(value) {
          this.itemList.forEach(function(item) {
            item.checked = value
          })
          // console.log(value);//true
          return value
        }
      },
      checkedCount : {
        get : function() {
          var i = 0
          this.itemList.forEach(function(item) {
            if (item.checked==true) i++
          })
          return i
        }
      },

      calTotalCost : {
        get : function() {
          var totalCost = 0
          this.itemList.forEach(function(item, index) {
            if (item.checked) {
              totalCost += item.productPrice*item.counter
            }
          })
          return totalCost
        }
      },

      calTotalAmount : {
        get : function() {
          var totalAmount = 0
          this.itemList.forEach(function(item, index) {
            if (item.checked) {
              totalAmount += item.counter
            }
          })
          return totalAmount
        }
      }
    },

    methods : {
      getData      : function() {
        var _this = this
        let _data = {
          'status'  : 1,
          'message' : 'success',
          'data'    : {
            'money' : 666,
            'list'  : [
              {
                'productName'        : '新玉润玫瑰菁华霜',
                'productDescription' : '深层滋养，持久保湿抵御干燥，令肌肤莹润饱满，如玉般晶莹细滑。',
                'productId'          : '01',
                'productPrice'       : 300,
                'productStorage'     : 50,
                'counter'            : 1,
                'checked'            : false,
              },
              {
                'productName'        : '新玉润保湿化妆水',
                'productDescription' : '蕴含佰草集“新天地玉润方”本草精华，特润呵护冬日肌肤。',
                'productId'          : '02',
                'productPrice'       : 200,
                'productStorage'     : 50,
                'counter'            : 1,
                'checked'            : false,
              },
              {
                'productName'        : '新玉润保湿凝露',
                'productDescription' : '蕴含佰草集“新天地玉润方”本草精华，特润呵护冬日肌肤。',
                'productId'          : '02',
                'productPrice'       : 400,
                'productStorage'     : 50,
                'counter'            : 1,
                'checked'            : false,
              }
            ]
          }
        }
        let res   = _data
        for (var i = 0, len = _data.data.list.length; i < len; i++) {
          var productList = _data.data.list[i]
          _this.itemList.push(productList)
        }
      },
      amountChange : function(item, pm) {
        if (pm > 0) {
          item.counter++
        } else {
          item.counter--
          if (item.counter < 1) {
            item.counter = 1
          }
        }
      },
      imgSrc: function (i) {
        var imgUrl = require('../static/images/' + (i+1) + '.jpg');
        return imgUrl
      },
      deleteConfirm : function(item) {
        this.deleteFlag     = true
        this.currentProduct = item
      },
      removeProduct : function(index) {
        // console.log(index);
        this.itemList.splice(index, 1)
        this.deleteFlag = false
      },

      toLink : function(fn) {
        var href = ''
        if (fn > 0) {
          console.log('跳转成功')
          this.isActive = false
          href          = 'address'
        } else {
          this.isActive = true
          href          = 'javascript:void(0)'
        }
        return href
      }

    }

  }

</script>


<style lang="scss">
    @import "../style/reset_pc.css";
    @import "../style/cart.css";

</style>
