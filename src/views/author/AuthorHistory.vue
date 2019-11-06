<template>
  <page-view :title="title">
    <a-card :bordered="false">
      <s-table
        style="margin-bottom: 24px"
        row-key="id"
        :columns="goodsColumns"
        :data="loadGoodsData">
      </s-table>
    </a-card>
  </page-view>
</template>
<script>
import { PageView } from '@/layouts'
import { STable } from '@/components'
import DetailList from '@/components/tools/DetailList'
import {authorAll} from '@/api/authorAll'
const DetailListItem = DetailList.Item

export default {
  components: {
    DetailList,
    DetailListItem,
    STable
  },
  data () {
     /* authorAll(values).then(respose =>{
       console.log("hello")
          console.log(respose)
          if(respose.code==200){
            alert("注册成功，即将跳转登陆页面")
            $router.push({ name: 'registerResult', params: { ...values } })
          //  $router.push({ name: 'login', params: { ...values } })
          console.log("跳转至登陆页面")
          }else{
            alert("注册失败，账号已存在")
          }
         }).catch(error => {
             console.log(error)
          }) */
    return {
      goodsColumns: [
        {
          title: '审批号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '审批人',
          dataIndex: 'auditor',
          key: 'auditor'
        },
        {
          title: '申请号',
          dataIndex: 'applyofId',
          key: 'applyofId'
        },
        {
          title: '审批状态',
          dataIndex: 'auditStatus',
          key: 'auditStatus',
          align: 'center'
        },
        {
          title: '备注',
          dataIndex: 'bizComent',
          key: 'bizComent',
          align: 'center'
        },
        {
          title: '审核时间',
          dataIndex: 'applyDate',
          key: 'applyDate',
          align: 'center'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadGoodsData: () => {
        return new Promise(resolve => {
          resolve({
            data: [

              {
                id: '1234561',
                auditor: '小鱼',
                applyofId: '12421432143214321',
                auditStatus: '通过',
                bizComent: '无',
                applyDate: '2019年11月6日 11:36:02'
              },
              {
                id: '1234561',
                auditor: '小鱼',
                applyofId: '12421432143214321',
                auditStatus: '拒绝',
                bizComent: '描述不符',
                applyDate: '2019年11月6日 11:36:02'
              },
              {
                id: '1234561',
                auditor: '小鱼',
                applyofId: '12421432143214321',
                auditStatus: '通过',
                bizComent: '无',
                applyDate: '2019年11月6日 11:36:02'
              },
              {
                id: '1234561',
                auditor: '小鱼',
                applyofId: '12421432143214321',
                auditStatus: '通过',
                bizComent: '无',
                applyDate: '2019年11月6日 11:36:02'
              },
              {
                id: '1234561',
                auditor: '小鱼',
                applyofId: '12421432143214321',
                auditStatus: '通过',
                bizComent: '无',
                applyDate: '2019年11月6日 11:36:02'
              },
              {
                id: '1234561',
                auditor: '小鱼',
                applyofId: '12421432143214321',
                auditStatus: '通过',
                bizComent: '无',
                applyDate: '2019年11月6日 11:36:02'
              },
            ],
            pageSize: 10,
            pageNo: 1,
            totalPage: 1,
            totalCount: 10
          })
        }).then(res => {
          return res
        })
      },

      scheduleColumns: [
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time'
        },
        {
          title: '当前进度',
          dataIndex: 'rate',
          key: 'rate'
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作员ID',
          dataIndex: 'operator',
          key: 'operator'
        },
        {
          title: '耗时',
          dataIndex: 'cost',
          key: 'cost'
        }
      ],
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        'processing': '进行中',
        'success': '完成',
        'failed': '失败'
      }
      return statusMap[status]
    }
  },
  computed: {
    title () {
      return this.$route.meta.title
    }
  }

}
</script>

<style lang="less" scoped>
  .title {
    color: rgba(0,0,0,.85);
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
</style>
