import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import mutations from './mutations'
import actions from './actions'

// 单个模块
import motest from './modules/motest/index'
const state = {
        'is_showLoading':true,
        'isLoading': false,
        'loadingMsg': '数据加载中...',
        'pushMsgs': []
    }

export default new vuex.Store({
	state,
    mutations,
    actions,
    modules: {
        motest
    }
})