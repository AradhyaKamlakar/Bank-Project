import { deleteRequest, getRequest, postRequest } from "./Methods";

class User {
  Register(body) {
    return postRequest("/Register", body);
  }
  Login(body) {
    return postRequest("/Login/login", body);
  }

  getUser(body){
    return postRequest('/Login/getUser',body);
  }

  getUserById(id){
    return getRequest(`/Login/get-user-by-id/${id}`)
  }

}

class Service {
  getServices() {
    return getRequest("/Manager");
  }

  addService(body) {
    return postRequest("/Manager/create-service", body);
  }

  updateService(body) {
    return postRequest("/Manager/update-service", body);
  }

  deleteService(id) {
    return deleteRequest(`/Manager/${id}`);
  }
}

class Token {

  createToken(userId, serviceId){
    return getRequest(`/Customer/create-token/${userId}/${serviceId}`)
  }

  getTokenByUserId(id) {
    return getRequest(`/Customer/find-token/${id}`);
  }

  getAllTokens(){
    return getRequest(`/Manager/get-all-tokens`);
  }

  setCurrentToken(token) {
    return postRequest('/Manager/set-current-token', token);
  }
  
  getCurrentToken(){
    return getRequest(`/Customer/get-current-token`);
  }

  setCurrentUserToken(token){
    return postRequest('/Customer/set-current-token', token);
  }

  getCurrentUserToken(){
    return getRequest('/Counter/get-current-user-token');
  }
  
  getHistoryTokens(){
    return getRequest(`/Manager/get-all-history-of-tokens`);
  }
}

class Counter {

  setNoShowStatus(id){
    return getRequest(`/Counter/no-show/${id}`);
  }

  setServicedStatus(id){
    return getRequest(`/Counter/serviced/${id}`);
  }


}

export const Api = {
  user: new User(),
  service: new Service(),
  token : new Token(),
  counter : new Counter()
};
