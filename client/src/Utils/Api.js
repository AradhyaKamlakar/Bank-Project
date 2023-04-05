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

}

export const Api = {
  user: new User(),
  service: new Service(),
  token : new Token(),
};
