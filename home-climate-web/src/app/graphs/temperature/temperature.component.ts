import { Component, OnInit } from "@angular/core";
import { ClimateService } from "../../services/climate-service.service";
import { map, tap, timestamp } from 'rxjs/operators';
import { ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";

@Component({
	selector: "temperature-display",
	templateUrl: "./temperature.component.html",
	styleUrls: ["./temperature.component.css"]
})
export class TemperatureComponent implements OnInit{

	public chartType = "line";
	public chartData: ChartDataSets[] = [
		{ 
			data: [], 
			label: 'Temperature', 
			backgroundColor: "rgba(255, 183, 77, 0.4)",
			borderColor: "rgb(255, 183, 77)"
		}
	];
	public chartLabels: Label[] = [];

	constructor(private climateService: ClimateService) { }
	
	public ngOnInit(): void {
		this.climateService.$climate
			.pipe(
				map(climateObject => {
					return {
						temperature: climateObject.temp,
						time: climateObject.timestamp
					}
				})
			)
			.subscribe((temperatureObject: {temperature: number, time: string}) => {
				this.insertNewTemperatureValue(temperatureObject);
			})
	}

	private insertNewTemperatureValue(temperatureObject: {temperature: number, time: string}): void {
		this.chartData[0].data.push(temperatureObject.temperature);
		this.chartLabels.push((temperatureObject.time));

		// For cleanliness only display 10 values max on the chart, if an insert will increase then length
		// passed that threshhold, begin removing the first data point
		if (this.chartData[0].data.length > 10) {
			this.chartData[0].data.shift();
			this.chartLabels.shift();
		}
	}

}