import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';

import { AppComponent } from './app.component';
import { GraphComponent } from './graph-container/graph/graph.component';
import { TemperatureComponent } from './graph-container/graph/temperature/temperature.component';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: "192.168.1.82",
  port: 9001,
  path: '/climate'
}

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    TemperatureComponent
  ],
  imports: [
    BrowserModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
