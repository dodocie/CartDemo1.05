<template>
    <div id="header">
        <header class="header">
            <h1 class="welcome_msg">{{msg+user}}</h1>
        </header>
    </div>

</template>

<script>
  export default {
    name: 'header',
    data(){
      return {
        msg: '你好呀，',
      }
    },
    computed: {
      user () {
        return 'user name...'
      }
    }
  }
</script>

<style>
    .welcome_msg{
        font-family: "微软雅黑", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 16px;
        background: rgba(44, 62, 80, 0.29);
        color: #2c3e50;
        height: 45px;
        line-height: 45px;
        width: 100%;
        max-width: 1920px;
        margin: auto;
        position: fixed;
        top: 0;
        z-index: 999;
    }

</style>