<template>
  <s-table
    ref="table"
    :rowKey="(record) => record.data.id"
    :columns="columns"
    :data="loadData"
    :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
  >
  </s-table>
</template>

<script>
  import { STable } from '@/components'

  export default {
    components: {
      STable
    },
    data() {
      return {
        columns: [
          {
            title: '申请编号',
            dataIndex: 'id'
          },
          {
            title: '申请人',
            dataIndex: 'applyOfName'
          },
          {
            title: '项目名称',
            dataIndex: 'applyOfProjectName',
          },
          {
            title: '状态',
            dataIndex: 'applyOfStatus',
          },
          {
            title: '申请时间',
            dataIndex: 'applyOfDate',
          },
          {
            table: '申请接口',
            dataIndex: 'applyOfPort',
            scopedSlots: {customRender: 'action'},
          }
        ],
        // 查询条件参数
        queryParam: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return this.$http.post('/applyof/applyofAll', {
            params: Object.assign(parameter, this.queryParam)
          }).then(res => {
            return res.result
          })
        },
        selectedRowKeys: [],
        selectedRows: []
      }
    },
    methods: {
      onSelectChange (selectedRowKeys, selectedRows) {
         this.selectedRowKeys = selectedRowKeys
         this.selectedRows = selectedRows
       }
    }
  }
</script>