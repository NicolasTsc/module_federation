import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PluginItem } from './pluginItem';


@Injectable({ providedIn: 'root' })
export class PluginService {
  private pluginsUrl = 'api/plugins';
  constructor(private http: HttpClient) { }

  getPlugins(): Observable<PluginItem[]> {
    return this.http.get<PluginItem[]>(this.pluginsUrl);
  }
}
