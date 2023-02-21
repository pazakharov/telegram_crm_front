import Api from '../api'
const state = {
  chains: [],
  loading: false
}

const mutations = {
  SET_CHAINS: (state, data) => {
    state.chains = data.map((chain) => { return { ...chain, 'edit': false } })
  },
  LOADING_ON: (state) => {
    state.loading = true
  },
  LOADING_OFF: (state) => {
    state.loading = false
  }
}

const actions = {
  async fetch({ commit }) {
    try {
      commit('LOADING_ON')
      const response = await Api.fetch()
      console.log(response)
      commit('SET_CHAINS', response)
    } catch (error) {
      Notification.error({ title: 'Возникла ошибка', message: error })
      console.error('ERROR fetch chains', error)
    } finally {
      commit('LOADING_OFF')
    }
  },
  async create({ commit }) {
    try {
      commit('LOADING_ON')
      const response = await Api.create()
      console.log(response)
    } catch (error) {
      Notification.error({ title: 'Возникла ошибка', message: error })
      console.error('ERROR create chains', error)
    } finally {
      commit('LOADING_OFF')
    }
  },
  async delete({ commit }, { id }) {
    try {
      commit('LOADING_ON')
      const response = await Api.delete(id)
      console.log(response)
    } catch (error) {
      Notification.error({ title: 'Возникла ошибка', message: error })
      console.error('ERROR create chains', error)
    } finally {
      commit('LOADING_OFF')
    }
  },
  async update({ commit }, { id, ...data }) {
    try {
      commit('LOADING_ON')
      delete (data.edit)
      const response = await Api.update(id, data)
      console.log(response)
    } catch (error) {
      Notification.error({ title: 'Возникла ошибка', message: error })
      console.error('ERROR create chains', error)
    } finally {
      commit('LOADING_OFF')
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

