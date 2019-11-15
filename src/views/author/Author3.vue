<template>
  <s-table
    ref="table"
    size="default"
    :columns="columns"
    :data="loadData"
  >
    <span slot="action" slot-scope="text, record">
      <a>编辑</a>
      <a-divider type="vertical"/>
      <a-dropdown>
        <a class="ant-dropdown-link">
          更多 <a-icon type="down"/>
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </span>
  </s-table>
</template>

<script>
  import { STable } from '@/components'
  import { applyofAll } from '@/api/applyofAll'

  export default {
    components: {
      STable,
      applyofAll
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
          return applyofAll(Object.assign(parameter, this.queryParam)).then(res => {
            console("hello")
            return res.result
          })
        },
      }
    },
    methods: {
      edit(row) {
        // axios 发送数据到后端 修改数据成功后
        // 调用 refresh() 重新加载列表数据
        // 这里 setTimeout 模拟发起请求的网络延迟..
        setTimeout(() => {
          this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        }, 1500)

      }
    }
  }
</script>