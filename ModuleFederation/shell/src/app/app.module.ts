import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientInMemoryWebApiModule, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './api/data.service';
import { ensureRoutesExist } from './plugin/routerExist';
import { RouteLoader } from './plugin/plugin.router';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(
      DataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ensureRoutesExist<RouteLoader>,
      multi: true,
      deps: [RouteLoader],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
