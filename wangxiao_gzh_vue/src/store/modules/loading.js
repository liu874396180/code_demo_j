import { AXIOSLOADING } from '../motation_type';
const Loading = {
state: {
axiosLoading: false
},
getters: {
axiosLoading: state => state.axiosLoading
},
actions: {
axiosLoadings({commit}, res){
commit(AXIOSLOADING, { res })
}
},
mutations: {
[AXIOSLOADING] (state, obj) {
state.axiosLoading = obj.res;
}
}
};
export default Loading;