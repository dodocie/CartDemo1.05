/**
 * Created by Administrator on 2017/10/23.
 */

new Vue({
  el         : '#app',
  data       : {
    msg            : '你好呀，买买买~',
    itemList       : [],
    currentProduct : '',
    deleteFlag     : false,
    isActive       : true,
    hasError       : 0,
    url            : ''
  },
  mounted    : function() {
    this.getData()
    //Q： 钩子的用法
  },
  directives : {
    numberOnly : {
      bind   : function(el) {
        el.handler = function() {
          var formatVal = /^\+?[1-9][0-9]*$/
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
          'list'  : [
            {
              'productName'        : '新玉润玫瑰菁华霜',
              'productDescription' : '深层滋养，持久保湿抵御干燥，令肌肤莹润饱满，如玉般晶莹细滑。',
              'productId'          : '01',
              'productPrice'       : 300,
              'productStorage'     : 50,
              'counter'            : 1,
              'checked'            : false,
              'productImg'         : 'images/1.jpg'
            },
            {
              'productName'        : '新玉润保湿化妆水',
              'productDescription' : '蕴含佰草集“新天地玉润方”本草精华，特润呵护冬日肌肤。',
              'productId'          : '02',
              'productPrice'       : 200,
              'productStorage'     : 50,
              'counter'            : 1,
              'checked'            : false,
              'productImg'         : 'images/2.jpg'
            },
            {
              'productName'        : '新玉润保湿凝露',
              'productDescription' : '蕴含佰草集“新天地玉润方”本草精华，特润呵护冬日肌肤。',
              'productId'          : '02',
              'productPrice'       : 400,
              'productStorage'     : 50,
              'counter'            : 1,
              'checked'            : false,
              'productImg'         : 'images/3.jpg'
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
        href          = 'address.html'
      } else {
        this.isActive = true
        href          = 'javascript:void(0)'
      }
      return href
    }

  }

})


