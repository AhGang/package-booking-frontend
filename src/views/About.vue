<template>
  <div class="about">
    <div class="div-card">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="运单号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input v-model="orderID"/>
        </a-form-item>
        <a-form-item label="取件时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input />
        </a-form-item>
      </a-form>
      <a-button type="primary" class="div-body-add-button" @click="bookTime">预约</a-button>
      <a-button type="primary" class="div-body-add-button">取消</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      dataName: 0,
      orderID: "",
      form: this.$form.createForm(this),
    };
  },
  created() {
  },
  methods: {
    handleSubmit() {},
    bookTime(){
       this.$store.dispatch("putAOrder",{orderID:this.orderID,msg:"book"});

    }
  }
};
</script>
