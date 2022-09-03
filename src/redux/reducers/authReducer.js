import { connect } from '../../ws';
import Api from '../../api';

const authReducer = (state = {auth: false}, action) => {
    switch (action.type) {
      case 'isLogin':
        return { ...state, auth: action.payload }
      default:
        return state
    }
}
export default authReducer;

export const isLogin = (data) => ({type: 'isLogin', payload: data});

export const AuthThunk = (login, password) => {
  return (dispatch) => {
    Api.Auth.Login(login, password).then((res) => {
      localStorage.setItem("token", res.data.token);
      connect(res.data.token);
      dispatch(isLogin(true));
    });

  }
}