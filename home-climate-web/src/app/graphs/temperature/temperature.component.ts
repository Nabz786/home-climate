import { Component, OnInit } from "@angular/core";
import { ClimateService } from "../../services/climate-service.service";
import { map } from 'rxjs/operators';
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

	private index = 0;

	constructor(private climateService: ClimateService) { }
	
	public ngOnInit(): void {
		this.climateService.$climate
			.pipe(
				map(c => c.temp)
			)
			.subscribe((temperature: number) => {
				this.insertNewTemperatureValue(temperature);
			})
	}

	private insertNewTemperatureValue(temperature: number): void {
		this.chartData[0].data.push(temperature);
		this.chartLabels.push((this.index++).toString());

		// For cleanliness only display 10 values max on the chart, if an insert will increase then length
		// passed that threshhold, begin removing the first data point
		if (this.chartData[0].data.length > 10) {
			this.chartData[0].data.shift();
			this.chartLabels.shift();
		}
	}

}