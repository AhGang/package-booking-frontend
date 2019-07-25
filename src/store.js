import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packageOrders: [],
    status: 'All'
  },
  getters: {
    filterData: state => {
      if(state.status !='All'){
         return state.packageOrders.filter(order => order.status == state.status)
      }else{
        return state.packageOrders
      }
     
    }
  },
  mutations: {
    initData(state, data) {
      state.packageOrders = []
      data.forEach(element => {
        let order = {
          "orderID": element.orderID,
          "orderName": element.orderName,
          "phone": element.phone,
          "status": element.status,
          "time": element.bookTime
        }
        state.packageOrders.push(order)
      });
    
    },
    listFilter(state, condition) {
       state.status = condition
    },

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
      const postRes = await axios({
        method: 'post',
        url: 'http://localhost:8080/package-orders',
        data: order
      });
      const getRes = await axios({
        method: 'get',
        url: 'http://localhost:8080/package-orders',
      });
      context.commit('initData', getRes.data)

    },
    async putAOrder(context, data) {
      let msg = data.msg;
      let orderID = data.orderID
      await axios({
        method: 'put',
        url: 'http://localhost:8080/package-orders/' + orderID,
        data: { msg: msg },
      })
      const getRes = await axios({
        method: 'get',
        url: 'http://localhost:8080/package-orders',
      });
      context.commit('initData', getRes.data)
    },
    async deleteAOrder(context, index) {
      let item = context.state.packageOrders[index]
      try {
        const deleteRes = axios({
          method: 'delete',
          url: 'http://localhost:8080/package-orders/' + item.id
        })
      } catch{

      }
      const getRes = await axios({
        method: 'get',
        url: 'http://localhost:8080/package-orders',
      });
      context.commit('initData', getRes.data)
    }


  }
})
