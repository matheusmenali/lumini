import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { ClientModel } from "../models/client.model";

@Injectable({
  providedIn: "root"
})
export class ClienteService {
  constructor(private httpClient: HttpClient) {}
  
  urlGetClientes = "https://gsb-new-onboarding-api-gateway.herokuapp.com/pix-pos-service";

  public getAll(): Observable<any> {
    return this.httpClient.get(`${this.urlGetClientes}/clients`);
  }

  public create(clientData: ClientModel) {
    return this.httpClient.post(`${this.urlGetClientes}/clients/create-client-pj`, clientData);
  }



}
