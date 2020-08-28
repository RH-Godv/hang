export default {
    REQ_MENULIST(state,payload){
        state.menuList = payload
    },
    //修改state角色
    REQ_ROLELIST(state,payload){
        state.roleList = payload
    },
    //修改state管理员
    REQ_USERLIST(state,payload){
        state.userList = payload
    },

    REQ_CATELIST(state,payload){
        state.cateList = payload
    },

    REQ_SPECSLIST(state,payload){
        state.specsList = payload
    }
}