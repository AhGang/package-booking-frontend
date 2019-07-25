<template>
  <div class="home">
    <a-table
      :columns="columns"
      :dataSource="Tabledata"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "运单号",
    dataIndex: "orderID",
    sorter: true,
    width: "20%"
  },
  {
    title: "收件人",
    dataIndex: "name",
    width: "20%"
  },
  {
    title: "电话",
    dataIndex: "phone"
  },
   {
    title: "状态",
    dataIndex: "status"
  },
   {
    title: "预约时间",
    dataIndex: "time"
  }
];
export default {
  name: "home",
  components: {},
  data() {
    return {
      Tabledata:[],
      columns,
      pagination: {},
      loading: false
    };
  },
  created() {},
  methods: {
    handleTableChange() {},
    addItem() {}
  }
};
</script>
