<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
        <s-tree
          :dataSource="orgTree"
          :openKeys.sync="openKeys"
          :search="true"
          @click="handleClick"
          @add="handleAdd"
          @titleClick="handleTitleClick"></s-tree>
      </a-col>
      <a-col :span="19">
    
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
  </page-view>
  </template>
  
      </a-col>
    </a-row>

    <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" />
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import OrgModal from './modules/OrgModal'
import { getOrgTree, getServiceList } from '@/api/manage'
import { testApi } from '@/api/common'
import { PageView } from '@/layouts'
// import { STable } from '@/components'
import DetailList from '@/components/tools/DetailList'
const DetailListItem = DetailList.Item

export default {
  name: 'DocumentCenter',
  components: {
    STable,
    STree,
    OrgModal,
    DetailList,
    DetailListItem,
    STable
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
      ],// 加载数据方法 必须为 Promise 对象
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
      openKeys: ['key-01'],

      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: 'no'
        },
        {
          title: '成员名称',
          dataIndex: 'description'
        },
        {
          title: '登录次数',
          dataIndex: 'callNo',
          sorter: true,
          needTotal: true,
          customRender: (text) => text + ' 次'
        },
        {
          title: '状态',
          dataIndex: 'status',
          needTotal: true
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      orgTree: [],
      selectedRowKeys: [],
      selectedRows: [],
      testData: ''
    }
  },
  created () {
    getOrgTree().then(res => {
      this.orgTree = res.result
    })
    testApi({ 'str': 'userIdheiheihei' }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    getTest () {
      // TODO q
    },
    handleClick (e) {
      console.log('handleClick', e)
      this.queryParam = {
        key: e.key
      }
      this.$refs.table.refresh(true)
    },
    handleAdd (item) {
      console.log('add button, item', item)
      this.$message.info(`提示：你点了 ${item.key} - ${item.title} `)
      this.$refs.modal.add(item.key)
    },
    handleTitleClick (item) {
      console.log('handleTitleClick', item)
    },
    titleClick (e) {
      console.log('titleClick', e)
    },
    handleSaveOk () {

    },
    handleSaveClose () {

    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>

<style lang="less">
  .custom-tree {

    /deep/ .ant-menu-item-group-title {
      position: relative;
      &:hover {
        .btn {
          display: block;
        }
      }
    }

    /deep/ .ant-menu-item {
      &:hover {
        .btn {
          display: block;
        }
      }
    }

    /deep/ .btn {
      display: none;
      position: absolute;
      top: 0;
      right: 10px;
      width: 20px;
      height: 40px;
      line-height: 40px;
      z-index: 1050;

      &:hover {
        transform: scale(1.2);
        transition: 0.5s all;
      }
    }
  }
</style>
