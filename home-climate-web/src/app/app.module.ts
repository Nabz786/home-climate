import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';

import { AppComponent } from './app.component';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: "192.168.1.82",
  port: 9001,
  path: '/climate'
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
