import { Injectable } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PluginItem } from './pluginItem';
import { PluginService } from './plugin.service';
import { loadRemoteModule } from '@angular-architects/module-federation';


@Injectable({
  providedIn: 'root',
})
export class RouteLoader {
  constructor(
    protected pluginService: PluginService,
    protected router: Router
  ) { }

  loadRoutes() {
    console.log('initialize');
    return new Promise<void>((resolve) => {

      this.pluginService.getPlugins().pipe(
        map((plugins) => this.buildRoutes(plugins)),
        tap(lazyRoutes => this.router.resetConfig([...lazyRoutes, ...this.router.config,]))
      ).subscribe(() => {
        resolve();
      });
    });
  }
  buildRoutes(plugins: PluginItem[]): Route[] {
    if (!plugins || plugins.length === 0) {
      return [];
    }
    const lazyRoutes: Routes = plugins.map(plugin => ({
      path: plugin.routePath,
      loadChildren: () =>
        loadRemoteModule({
          remoteEntry: plugin.remoteEntry,
          type: 'module',
          exposedModule: plugin.exposedModule,
        }).then((m) => m[plugin.ngModuleName]),
    }));
    return [...lazyRoutes];
  }
}




























// import { Injectable } from '@angular/core';
// import { Route, Router } from '@angular/router';
// import { Observable, combineLatest, from, of } from 'rxjs';
// import { filter, map, switchMap, take, tap } from 'rxjs/operators';

// import { PluginItem } from './pluginItem';
// import { PluginService } from './plugin.service';
// import { loadRemoteModule } from '@angular-architects/module-federation';
// import { PluginExistGuard } from './pluginExist.guard';
// import { Plugins } from 'protractor/built/plugins';


// @Injectable({
//   providedIn: 'root',
// })
// export class RouteLoader {
//   constructor(
//     protected pluginService: PluginService,
//     protected router: Router
//   ) { }

//   loadRoutes() {
//     console.log('initialize *******************************************');
//     return new Promise<void>((resolve) => {

//       combineLatest([this.pluginService.getPlugins().pipe(
//         switchMap(() => this.pluginService.getPlugins()),
//         filter(plugins => plugins && plugins.length > 0),
//         switchMap(() => this.pluginService.getPlugins()),
//         take(1),
//         switchMap((plugins) => { return this.mergeRoutesAndResetRouter(plugins); })
//       )])
//         // this.pluginService.getPlugins().pipe(
//         //   switchMap(() => this.pluginService.getPlugins()),
//         //   filter(plugins => plugins && plugins.length > 0),
//         //   switchMap((plugins) => { return this.mergeRoutesAndResetRouter(plugins); })
//         // )

//         .subscribe(() => {

//           console.log(
//             'resolve*********************************************************************'
//           );
//           console.log(this.router.config);
//           resolve();
//         });
//     });
//   }

//   private mergeRoutesAndResetRouter(plugins: PluginItem[]) {
//     if (!plugins || plugins.length === 0) {
//       return of(this.router.config);
//     }

//     const routes = from(plugins).pipe(
//       map((plugin) => this.buildRoute(plugin)),
//       map((route) => [...route, ...this.router.config]),
//       map((mergedRoutes) => this.router.resetConfig(mergedRoutes)));
//     return routes;

//   }

//   private buildRoute(item: PluginItem) {
//     return [
//       {
//         path: item.routePath,
//         loadChildren: () =>
//           loadRemoteModule({
//             remoteEntry: item.remoteEntry,
//             type: 'module',
//             exposedModule: item.exposedModule,
//           }).then((m) => m[item.ngModuleName]),
//       },
//     ];
//   }
// }

