export default {
	test_root({commit},xx){
		//...
		commit('DAXIE', xx);
	},
	
    getCommunicationStuListData({commit}){
        api.request(URL.COMMUNICATION_STU_LIST).then(
            response => {
                commit('UPDATE_COMMUNICATION_STU_LIST_DATA', response);
            }).catch(
            error => {
                console.log(error);
            }
        )
    },
    getCommunicationStuMessageListData({commit}, stuId){
        api.request(URL.COMMUNICATION_STU_MESSAGE_LIST(stuId)).then(
            response => {
                commit('UPDATE_COMMUNICATION_STU_MESSAGE_LIST_DATA', response);
            }).catch(
            error => {
                console.log(error);
            }
        )
    },
    postCommunicationMessageData({commit}, {data, callback}){   //请求带回调可以采用此种写法
        api.request(URL.COMMUNICATION_STU_ADD_MESSAGE, data, true).then(
            response => {
                callback();
            }).catch(
            error => {
                console.log(error);
            }
        )
    }
}