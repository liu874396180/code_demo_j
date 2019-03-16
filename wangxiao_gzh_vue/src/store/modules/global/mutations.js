export default {
       
    CHANGEACTIVETABS(state,res){//这里的state对应着上面这个state
        state.activeTabs = res || 0;
        //你还可以在这里执行其他的操作改变state
        //console.log(`大写的mutations${res}---${state.show}`)
    },
    SAVEMOBILE(state,res) {
        state.saveMobile = res || "";
    }

}
