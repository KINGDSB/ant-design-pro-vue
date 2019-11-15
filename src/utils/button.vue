
<template>
<!-- use plane  -->
<!-- 传入bgColor改变按钮背景色 -->
<!-- state切换button的状态 调用cancel()可以切换 -->
<!-- text为按钮文字 -->
  <div class="container">
    <button  
      @click="confirm"
      :disabled="state" 
      class="confirm" 
      :style="{background: btnData.bgColor}"
    >{{text}}</button>
  </div>
</template>
<script>
export default {
  data(){
    return {
      text: this.btnData.text,
      state: false,
    }
  },
  props: {
    btnData: {
      types: Array,
      default() {
        return {
          text: '确认',
        }
      }
    }
  },
  methods: {
    confirm(){
      this.text += '...'
      this.state = true
      //这里是激活父组件的事件，因为子组件是不会冒泡到父组件上的，必须手动调用$emit
      //相对应父组件要在调用该组件的时候，将其挂载到上面
      this.$emit("confirm")
    },
    cancel(){
      this.text = this.btnData.text
      this.state = false
    }
  }
}
</script>
<style lang="less" scoped>
.confirm {
  border: none;
  color: #fff;
  width: 100%;
//   align:center;
  padding: 1rem 0;
  border-radius: 4px;
  font-size: 1.6rem;
  background: #5da1fd;
  &:focus {
    outline: none;
  }
}
</style>