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
				//The timestamp is sent in the form of UTC seconds from EPOCH, we reconvert it to an hour:minute timestamp
				let messagePayloadObject = JSON.parse(message.payload.toString());
				messagePayloadObject.timestamp = this.getFormattedTime(messagePayloadObject.timestamp);

				this.climateSubject.next(messagePayloadObject);
			});
	}

	private getFormattedTime(epochSeconds: number) {
		const dateTime =  new Date(epochSeconds * 1000);
		const hoursMinutesString = (dateTime.getHours() < 10 ? "0" : "") + dateTime.getHours() + ":" + (dateTime.getMinutes() < 10 ? "0" : "") + dateTime.getMinutes();

		return hoursMinutesString;
	}
}