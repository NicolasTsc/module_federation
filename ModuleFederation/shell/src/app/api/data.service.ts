import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { PluginItem } from "../plugin/pluginItem";

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  createDb() {

    let plugins: PluginItem[] = [
      {

        "remoteEntry": 'http://localhost:5001/remoteEntry.js',
        "exposedModule": './Module',
        "displayName": "Customers",
        "routePath": 'customers',
        "ngModuleName": 'CustomersModule'
      },
      {
        "remoteEntry": 'http://localhost:5002/remoteEntry.js',
        "exposedModule": './Module',
        "displayName": "Orders",
        "routePath": "orders",
        "ngModuleName": 'OrdersModule'
      }

    ];

    return { plugins };

  }
}
