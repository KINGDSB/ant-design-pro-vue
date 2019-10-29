<template>
  <div class="main user-layout-register">
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item v-bind="formItemLayout" label="申请人">
      <a-input
        v-decorator="[
          'ApplyOfName',
          {
            rules: [
              {
                type: 'text',
                message: '申请人不能为空!',
              },
              {
                required: true,
                message: '请正确填写姓名!',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <!-- <a-form-item v-bind="formItemLayout" label="Password">
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Confirm Password">
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item> -->
    <a-form-item v-bind="formItemLayout">
      <span slot="label">
        项目名称&nbsp;
        <a-tooltip title="申请的项目名称">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
      <a-input
        v-decorator="[
          'ApplyOfProjectName',
          {
            rules: [{ required: true, message: '项目名称不能为空!', whitespace: false }],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="申请接口">
      <a-cascader
        v-decorator="[
          'ApplyOfPort',
          {
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [
              { type: 'array', required: true, message: 'Please select your habitual residence!' },
            ],
          },
        ]"
        :options="ApplyOfPort"
      />
    </a-form-item>
    <!-- <a-form-item v-bind="formItemLayout" label="Phone Number">
      <a-input
        v-decorator="[
          'phone',
          {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          },
        ]"
        style="width: 100%"
      >
        <a-select
          slot="addonBefore"
          v-decorator="['prefix', { initialValue: '86' }]"
          style="width: 70px"
        >
          <a-select-option value="86">
            +86
          </a-select-option>
          <a-select-option value="87">
            +87
          </a-select-option>
        </a-select>
      </a-input>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Website">
      <a-auto-complete
        v-decorator="['website', { rules: [{ required: true, message: 'Please input website!' }] }]"
        placeholder="website"
        @change="handleWebsiteChange"
      >
        <template slot="dataSource">
          <a-select-option v-for="website in autoCompleteResult" :key="website">
            {{ website }}
          </a-select-option>
        </template>
        <a-input />
      </a-auto-complete>
    </a-form-item> -->
    <!-- <a-form-item
      v-bind="formItemLayout"
      label="Captcha"
      extra="We must make sure that your are a human."
    >
      <a-row :gutter="8">
        <a-col :span="12">
          <a-input
            v-decorator="[
              'captcha',
              { rules: [{ required: true, message: 'Please input the captcha you got!' }] },
            ]"
          />
        </a-col>
        <a-col :span="12">
          <a-button>Get captcha</a-button>
        </a-col>
      </a-row>
    </a-form-item> -->
    <!-- <a-form-item v-bind="tailFormItemLayout">
      <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
        I have read the
        <a href="">
          agreement
        </a>
      </a-checkbox>
    </a-form-item> -->
    <a-form-item v-bind="tailFormItemLayout">
      <a-button 
      type="primary" 
      html-type="submit"
      
      @click.stop.prevent="handleApplyOf"
      :disabled="registerBtn">提交
      </a-button>
    </a-form-item>
  </a-form>
  </div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin.js'
import {applyof} from '@/api/applyof'
import {Workplace} from '@/views/dashboard/Workplace'
const ApplyOfPort = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

export default {
  name: 'ApplyOf',
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
  data() {
    return {
      confirmDirty: false,
      ApplyOfPort,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    // handleConfirmBlur(e) {
    //   const value = e.target.value;
    //   this.confirmDirty = this.confirmDirty || !!value;
    // },
    // compareToFirstPassword(rule, value, callback) {
    //   const form = this.form;
    //   if (value && value !== form.getFieldValue('password')) {
    //     callback('Two passwords that you enter is inconsistent!');
    //   } else {
    //     callback();
    //   }
    // },
    // validateToNextPassword(rule, value, callback) {
    //   const form = this.form;
    //   if (value && this.confirmDirty) {
    //     form.validateFields(['confirm'], { force: true });
    //   }
    //   callback();
    // },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.autoCompleteResult = autoCompleteResult;
    },
    //申请的方法
     handleApplyOf () {
      const { form: { validateFields }, state, $router } = this
      console.log('handleApplyOf')
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
        register(values).then(respose =>{
          console.log(respose)
          if(respose.code==200){
            alert("申请提交，请耐心等待")
            $router.push({ name: 'Workplace', params: { ...values } })
          //  $router.push({ name: 'login', params: { ...values } })
          console.log("跳转至个人中心")
          }else{
            alert("提交失败，请重试")
          }
         }).catch(error => {
             console.log(error)
          })
          // $router.push({ name: 'registerResult', params: { ...values } })
        }
      })
    }
  },
};
</script>