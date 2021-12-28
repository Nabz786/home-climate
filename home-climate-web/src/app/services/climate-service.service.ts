import { Injectable } from "@angular/core";
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { Observable, Subject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class ClimateService {
	private climateSubject: Subject<string> = new Subject<any>();

	public $climate: Observable<any> = this.climateSubject.asObservable();

	constructor (private mqttService: MqttService) { }

	public initializeService(): void {
		this.mqttService.observe("climate")
			.subscribe((message: IMqttMessage) => {
				this.climateSubject.next(JSON.parse(message.payload.toString()));
			})
	}
}