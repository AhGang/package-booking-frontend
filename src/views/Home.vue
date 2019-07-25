<template>
  <div class="home">
    <div>
      <h1>菜鸟驿站</h1>
      <a-button>All</a-button>
      <a-button>已预约</a-button>
      <a-button>已取件</a-button>
      <a-button>未预约</a-button>
      <a-button type="primary" @click="showPackage">添加</a-button>
    </div>
    <div>
      <a-table
         :rowKey="order => order.orderID"
        :columns="columns"
        :dataSource="$store.state.packageOrders"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      ></a-table>
    </div>
    <div>
      <a-modal title="包裹入库" v-model="isPackageShow" @ok="addOrder">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item label="运单号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input v-model="orderID" />
          </a-form-item>
          <a-form-item label="收件人" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input v-model="orderName" />
          </a-form-item>
          <a-form-item label="电话" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input v-model="phone" />
          </a-form-item>
          <a-form-item label="重量" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input v-model="weight" />
          </a-form-item>
           <a-form-item label="确认收货" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-button  @click="commitOrder">确认收货</a-button>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
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
    dataIndex: "orderName",
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
  },
   {
    title: "确认收货",
    dataIndex: "operation"
  }
];
export default {
  name: "home",
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      Tabledata: [],
      columns,
      pagination: {},
      loading: false,
      isPackageShow: false,
      orderID: "",
      orderName: "",
      phone: "",
      weight: "",
      time:"",
      commitOrder:false  
      
    };
  },
  created() {
     this.$store.dispatch("initData");
     this.Tabledata = this.$store.state.packageOrders
  },
  methods: {
    handleTableChange() {},
    showPackage() {
      this.isPackageShow = true;
    },
    addOrder() {
      let newOrder = {
        orderID: this.orderID,
        orderName: this.orderName,
        phone: this.phone,
        status: "未取件" ,
      };
      this.$store.dispatch("postAOrder",newOrder);
      this.Tabledata.push(newOrder)
      this.isPackageShow = false;
    },
    commitOrder(){
      this.$store.dispatch("putAOrder");
    },
    handleSubmit() {}
  }
};
</script>
