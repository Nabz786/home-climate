import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public message: string;

  public messages: string[] = [];

  constructor(private mqttService: MqttService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.mqttService.observe('climate').subscribe((message: IMqttMessage) => {
      //this.message = message.payload.toString();
      this.messages.push(message.payload.toString());
    })
  }

}
