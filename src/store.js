import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packageOrders: []
  },
  mutations: {
    initData(state, data) {
      data.forEach(element => {
        let order = {
          "orderID": element.orderID,
          "orderName":element.orderName,
          "phone":element.phone,
          "status" :element.status
        }
        state.packageOrders.push(order)
      });
    }

  },
  actions: {
    initData(context) {
      axios({
        method: 'get',
        url: 'http://localhost:8080/package-orders',
      }).then((response) => {
        context.commit('initData', response.data)
      })


    },
    async postAOrder(context, order) {
      console.log(order)
      const postRes = await axios({
        method: 'post',
        url: 'http://localhost:8080/package-orders',
        data: order
      });
    },
    async putAItem(context, index) {
      let item = context.state.packageOrders[index]
      axios({
        method: 'put',
        url: 'http://localhost:8080/package-orders/' + item.id,
        data: item,


      })
    },
    async deleteAOrder(context, index) {
      let item = context.state.packageOrders[index]
      try {
        const deleteRes = axios({
          method: 'delete',
          url: 'http://localhost:8080/package_orders/' + item.id
        })
      } catch{

      }
      const getRes = await axios({
        method: 'get',
        url: 'http://localhost:8080/package_orders',
      });
      context.commit('initData', getRes.data)
    }


  }
})
