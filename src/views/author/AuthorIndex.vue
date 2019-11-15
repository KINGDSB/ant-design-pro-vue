<template>
  <page-view :title="title">
    <a-card :bordered="false">
      <detail-list title="接口申请">
        <detail-list-item term="申请号">1000000000</detail-list-item>
        <detail-list-item term="状态">正在申请</detail-list-item>
        <detail-list-item term="申请接口">支付，购物车</detail-list-item>
        <detail-list-item term="审批号">3214321432</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>
      <detail-list title="用户信息">
        <detail-list-item term="申请人">付小小</detail-list-item>
        <detail-list-item term="联系电话">18100000000</detail-list-item>
        <detail-list-item term="所属部门">支付事业部</detail-list-item>
        <detail-list-item term="申请时间">2019年11月5日11:31:31</detail-list-item>
        <detail-list-item term="备注">	无</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>

      <div class="title">接口详情</div>
      <s-table
        style="margin-bottom: 24px"
        row-key="id"
        :columns="goodsColumns"
        :data="loadGoodsData">
      </s-table>
    </a-card>
    <div class="btn-box">
      <Btn 
        :btnData="{text: '同意'}"
        @confirm="confirm"
        ref="btn"
      ></Btn>
    </div> 
    <div class="btn-nobox">
    <!-- <Btn 
        :btnData="{text: '拒绝'}"
        @confirm="confirm"
        ref="btn"
      ></Btn> -->
     </div>  
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import { STable } from '@/components'
import DetailList from '@/components/tools/DetailList'
import {applyofDetail} from '@/api/applyofAll'
import Btn from '@/utils/button'
const DetailListItem = DetailList.Item

export default {
  components: {
    DetailList,
    DetailListItem,
    STable,
    Btn
  },
  methods: {
    confirm(){
      if(!this.companyName){
        this.$toast("公司名不能为空")  
        this.$refs.btn.cancel()
      }
  }
},
  data () {
    return {
      goodsColumns: [
        {
          title: '接口编号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '接口名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '接口URL地址',
          dataIndex: 'barcode',
          key: 'barcode'
        },
        {
          title: '单价',
          dataIndex: 'price',
          key: 'price',
          align: 'right'
        },
        {
          title: '数量（件）',
          dataIndex: 'num',
          key: 'num',
          align: 'right'
        },
        {
          title: '金额',
          dataIndex: 'amount',
          key: 'amount',
          align: 'right'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadGoodsData: () => {
        return new Promise(resolve => {
          resolve({
            data: [
              {
                id: '1234561',
                name: '支付接口',
                barcode: '12421432143214321',
                price: '2.00',
                num: '1',
                amount: '2.00'
              },
              {
                id: '1234562',
                name: '购物车接口',
                barcode: '12421432143214322',
                price: '3.00',
                num: '2',
                amount: '6.00'
              },
              {
                id: '1234563',
                name: 'json接口',
                barcode: '12421432143214323',
                price: '7.00',
                num: '4',
                amount: '28.00'
              },
              {
                id: '1234564',
                name: '入库接口',
                barcode: '12421432143214324',
                price: '8.50',
                num: '3',
                amount: '25.50'
              }
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
