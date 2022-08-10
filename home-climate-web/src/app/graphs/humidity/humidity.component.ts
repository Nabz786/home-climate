import { Component, OnInit } from "@angular/core";
import { ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import { map } from "rxjs/operators";
import { ClimateService } from "src/app/services/climate-service.service";

@Component({
	selector: "humidity-display",
	templateUrl: "./humidity.component.html",
	styleUrls: ["./humidity.component.css"]
})
export class HumidityComponent implements OnInit{

	public chartType = "line";
	public chartData: ChartDataSets[] = [
		{ 
			data: [], 
			label: 'Humidity %', 
			backgroundColor: "rgba(66, 165, 245, 0.4)",
			borderColor: "rgb(66, 165, 245)",
			pointBackgroundColor: "rgb(240, 56, 255)",
		}
	];

	public chartLabels: Label[] = [];

	constructor (private climateService: ClimateService) { }

	public ngOnInit(): void {
		this.climateService.$climate
			.pipe(
				map(climateObject => {
					return {
						humidity: climateObject.humidity,
						time: climateObject.timestamp
					}
				})
			)
			.subscribe((humidityObject: { humidity: number, time: string }) => {
				this.insertNewHumidityValue(humidityObject);
			});
	}

	private insertNewHumidityValue(humidityObject: { humidity: number, time: string }): void {
		this.chartData[0].data.push(humidityObject.humidity);
		this.chartLabels.push(humidityObject.time);

		// For cleanliness only display 10 values max on the chart, if an insert will increase then length
		// passed that threshhold, begin removing the first data point
		if (this.chartData[0].data.length > 10) {
			this.chartData[0].data.shift();
			this.chartLabels.shift();
		}
	}
}