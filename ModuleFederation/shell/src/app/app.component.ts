import { Component, OnInit } from '@angular/core';
import { PluginService } from './plugin/plugin.service';
import { PluginItem } from './plugin/pluginItem';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Shell Application';
  plugins: PluginItem[] | undefined;
  constructor(private pluginServie: PluginService) {

  }
  ngOnInit(): void {

    this.pluginServie.getPlugins().subscribe(data => this.plugins = data);

  }
}
