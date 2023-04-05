import { getRequest, postRequest } from "./Methods";

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
    return postRequest("/manager/addService", body);
  }

  updateService(body) {
    return postRequest("/manager/updateService", body);
  }

  deleteService(body) {
    return postRequest("/manager/deleteService", body);
  }
}

export const Api = {
  user: new User(),
  service: new Service(),
};
