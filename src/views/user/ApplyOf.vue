<template>
  <div class="main user-layout-register">
    <h3><span></span></h3>
    <a-form ref="formRegister" :form="form" id="formRegister">
      <!-- <a-form-item   
        label="所属单位">
         <a-input
          size="large"
          type="text"
          autocomplete="false"
          placeholder="所属单位"
          v-decorator="['organization', {rules: [{ required: true, message: '填写正确单位名称' }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-item> -->
        
      <a-form-item   
        label="申请人">
         <a-input
          size="large"
          type="text"
          autocomplete="false"
          placeholder="申请人姓名"
          v-decorator="['applyOfName', {rules: [{ required: true, message: '申请人姓名不能为空！' }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-item>

      <a-form-item   
        label="项目名称">
         <a-input
          size="large"
          type="text"
          autocomplete="false"
          placeholder="填写项目名称"
          v-decorator="['applyOfProjectName', {rules: [{ required: true, message: '项目名称不能为空！' }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-item>

      <a-form-item   
        label="申请接口">
         <a-input
          size="large"
          type="text"
          autocomplete="false"
          placeholder="填写需要申请的接口"
          v-decorator="['applyOfPort', {rules: [{ required: true, message: '请填写需要申请的接口' }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-item>

      <a-form-item   
        label="申请日期">
         <a-input
          size="large"
          type="text"
          autocomplete="false"
          placeholder="申请日期"
          v-decorator="['applyOfDate', {rules: [{ required: true, message: '日期不能为空' }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="registerBtn">提交
        </a-button>
        <router-link class="workplace" :to="{ name: 'Workplace' }">返回个人中心</router-link>
        <!-- $router.push({ name: 'Workplace', params: { ...values } }) -->
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin.js'
import { getSmsCaptcha } from '@/api/login'
import {applyof} from '@/api/applyof'
import {Workplace} from '@/views/dashboard/Workplace'

export default {
  name: 'Register',
  components: {
  },
  mixins: [mixinDevice],
  data () {
    return {
      form: this.$form.createForm(this),

      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      registerBtn: false
    }
  },
  computed: {
    passwordLevelClass () {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName () {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor () {
      return levelColor[this.state.passwordLevel]
    }
  },
  methods: {
    handleSubmit () {
      const { form: { validateFields }, state, $router } = this
      console.log("handleSubmit:")
      console.log('handleSubmit')
      validateFields({ force: true }, (err, values) => {
        console.log('validateFields111')
        if (!err) {
          state.passwordLevelChecked = false

          // console.log(values)

        //  xxxxApi({ 'str': 'userIdheiheihei' }).then(response => {
        //     console.log(response)
        //   }).catch(error => {
        //     console.log(error)
        //   })
        // values['userName'] = values.email
        console.log(values)
        applyof(values).then(respose =>{
          console.log(respose)
          if(respose.code==200){
            alert("已提交申请，申请进度可在个人中心查看")
            $router.push({ name: 'Workplace', params: { ...values } })
            // $router.push({ name: 'registerResult', params: { ...values } })
          //  $router.push({ name: 'login', params: { ...values } })
          // console.log("跳转至登陆页面")
          }else{
            alert("提交失败，请重试")
          }
         }).catch(error => {
             console.log(error)
          })
          // $router.push({ name: 'registerResult', params: { ...values } })
        }
      })
    },
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
      this.registerBtn = false
    }
  },
  watch: {
    'state.passwordLevel' (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="less">
  .user-register {

    &.error {
      color: #ff0000;
    }

    &.warning {
      color: #ff7e05;
    }

    &.success {
      color: #52c41a;
    }

  }

  .user-layout-register {
    .ant-input-group-addon:first-child {
      background-color: #fff;
    }
  }
</style>
<style lang="less" scoped>
  .user-layout-register {

    & > h3 {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .register-button {
      width: 50%;
    }

    .workplace {
      float: right;
      line-height: 40px;
    }
  }
</style>
