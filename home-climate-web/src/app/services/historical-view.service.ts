import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class HistoricalDataService {
	constructor (private httpClient: HttpClient) {  }

	public getHistoricalData(): Observable<HistoricalDataView[]> {
		return this.httpClient.get<HistoricalDataView[]>("http://192.168.1.82:8000/historical/");
	}
}

export class HistoricalDataView {
	hourlyInterval: number;
	temperatureAverage: number;
	humidityAverage: number;
}