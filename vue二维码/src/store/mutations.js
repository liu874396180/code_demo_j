export default{
	HIDE_LOADING(state){
        state.isLoading = false;
    },
    HIDE_TOP_WARNING_MODAL(state){
        state.pushMsgs.pop();
    },
}
