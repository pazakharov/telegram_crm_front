import ChainsApi from '../api/chains'
import MessagesApi from '../api/messages'
const state = {
  chains: [],
  messages: [],
  currentChain: { title: null },
  loading: false,
  loadingMessages: false
}

const mutations = {
  SET_CHAINS: (state, data) => {
    state.chains = data.map((chain) => { return { ...chain, 'edit': false } })
  },
  SET_MESSAGES: (state, data) => {
    state.messages = data
  },
  LOADING_ON: (state) => {
    state.loading = true
  },
  LOADING_OFF: (state) => {
    state.loading = false
  },
  LOADING_MESSAGES_ON: (state) => {
    state.loadingMessages = true
  },
  LOADING_MESSAGES_OFF: (state) => {
    state.loadingMessages = false
  },
  SET_CURRENT_CHAIN: (state, chain) => {
    state.currentChain = chain
  }
}

const actions = {
  async fetch({ commit }) {
    try {
      commit('LOADING_ON')
      const response = await ChainsApi.fetch()
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
      await ChainsApi.create()
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
      await ChainsApi.delete(id)
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
      await ChainsApi.update(id, data)
    } catch (error) {
      Notification.error({ title: 'Возникла ошибка', message: error })
      console.error('ERROR create chains', error)
    } finally {
      commit('LOADING_OFF')
    }
  },
  setCurrentChain({ commit }, chain) {
    commit('SET_CURRENT_CHAIN', chain)
  },
  async fetchMessages({ commit, state }, params) {
    try {
      commit('LOADING_MESSAGES_ON')
      const response = await MessagesApi.fetch(params)
      console.log(response)
      commit('SET_MESSAGES', response)
    } catch (error) {
      Notification.error({ title: 'Возникла ошибка', message: error })
      console.error('ERROR fetch messages', error)
    } finally {
      commit('LOADING_MESSAGES_OFF')
    }
  },
  async createMessage({ commit }, data) {
    try {
      commit('LOADING_ON')
      await MessagesApi.create(data)
    } catch (error) {
      Notification.error({ title: 'Возникла ошибка', message: error })
      console.error('ERROR create Message', error)
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

