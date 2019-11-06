<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="我的待办" content="8个任务" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="本周任务平均处理时间" content="32分钟" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="本周完成任务数" content="24个"/>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="审批页面">

      <div slot="extra">
        <a-radio-group v-model="status">
          <a-radio-button value="all">全部</a-radio-button>
          <a-radio-button value="processing">正在申请</a-radio-button>
          <a-radio-button value="waiting">已审批</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>
      <!-- <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="$refs.taskForm.add()">添加</a-button>
      </div> -->
      <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-list-item-meta :description="item.applyOfPort">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
            <a slot="title">{{ item.applyOfProjectName }}</a>
          </a-list-item-meta>
          <!-- 路由至详情页 -->
           <router-link slot="actions" class="less" :to="{ name: 'AuthorIndex' }">详情</router-link>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>同意</a></a-menu-item>
                <a-menu-item><a>拒绝</a></a-menu-item>
              </a-menu>
              <a>审批<a-icon type="down"/></a>
            </a-dropdown>
          </div>
          
          <div id="applyOf" class="list-content">
            <div class="list-content-item">
              <span>项目名称</span>
              <p>{{ item.applyOfProjectName }}</p>
            </div>
            <div class="list-content-item">
              <span>申请人</span>
              <p>{{ item.applyOfName }}</p>
            </div>
            <div class="list-content-item">
              <span>申请时间</span>
              <p>{{ item.applyOfDate }}</p>
            </div>
            <div class="list-content-Text">
              <!-- <a-progress :percent="item.progress.value" :status="!item.progress.status ? null : item.progress.status" style="width: 180px" /> -->
              <span>申请状态</span>
              <p>{{ item.applyOfStatus }}</p>
            </div>
          </div>
        </a-list-item>
      </a-list>

      <!-- <task-form ref="taskForm" /> -->
    </a-card>
  </div>
</template>
<script>
import HeadInfo from '@/components/tools/HeadInfo'
// import TaskForm from './modules/TaskForm'
import {applyofAll} from '@/api/applyofAll'
import {applyofDetail} from '@/api/applyofAll'
const data = []
  // if(true){
  //   applyofAll(values).then(respose =>{
  //         console.log(respose)
  //         if(respose.code==200){
  //           alert("注册成功，即将跳转登陆页面")
  //           $router.push({ name: 'registerResult', params: { ...values } })
  //         //  $router.push({ name: 'login', params: { ...values } })
  //         console.log("跳转至登陆页面")
  //         }else{
  //           alert("注册失败，账号已存在")
  //         }
  //        }).catch(error => {
  //            console.log(error)
  //         })
  // }
data.push({
  applyOfProjectName: 'Alipay',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
  applyOfPort: '支付、审批、申请、入库、登录、注册、查询、调用、购物车、秒杀、搜索、订单',
  applyOfName: '付晓晓',
  applyOfDate: '2018-07-26 22:44',
  /* progress: {
    value: 90
  } */
  applyOfStatus: '申请中'
})
data.push({
  applyOfProjectName: 'Angular',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
  applyOfPort: '支付、审批、申请、入库、登录、注册、查询、调用、购物车、秒杀、搜索、订单',
  applyOfName: '曲丽丽',
  applyOfDate: '2018-07-26 22:44',
  /* progress: {
    value: 54
  } */
  applyOfStatus: '申请中'
})
data.push({
  applyOfProjectName: 'Ant Design',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  applyOfPort: '支付、审批、申请、入库、登录、注册、查询、调用、购物车、秒杀、搜索、订单',
  applyOfName: '林东东',
  applyOfDate: '2018-07-26 22:44',
 /*  progress: {
    value: 66
  } */
  applyOfStatus: '申请中'
})
data.push({
  applyOfProjectName: 'Ant Design',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
  applyOfPort: '支付、审批、申请、入库、登录、注册、查询、调用、购物车、秒杀、搜索、订单',
  applyOfName: '周星星',
  applyOfDate: '2018-07-26 22:44',
  /* progress: {
    value: 30
  } */
  applyOfStatus: '申请中'
})
data.push({
  applyOfProjectName: 'Bootstrap',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
  applyOfPort: '支付、审批、申请、入库、登录、注册、查询、调用、购物车、秒杀、搜索、订单',
  applyOfName: '吴加好',
  applyOfDate: '2018-07-26 22:44',
  /* progress: {
    status: 'exception',
    value: 100
  } */
  applyOfStatus: '申请中'
})

export default {
  name: 'StandardList',
  components: {
    HeadInfo,
    // TaskForm
  },
  data () {
    return {
      data,
      status: 'all'
    }
  }
}
</script>

<style lang="less" scoped>
    .ant-avatar-lg {
        width: 48px;
        height: 48px;
        line-height: 48px;
    }

    .list-content-item {
        color: rgba(0, 0, 0, .45);
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        margin-left: 40px;
        span {
            line-height: 20px;
        }
        p {
            margin-top: 4px;
            margin-bottom: 0;
            line-height: 22px;
        }
    }
    
    .list-content-Text {
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        margin-left: 40px;
        span {
            color: rgba(0, 0, 0, .45);
            line-height: 20px;
        }
        p {
            color: rgba(247, 6, 6, 0.45);
            margin-top: 4px;
            margin-bottom: 0;
            line-height: 22px;
        }
    }
</style>
