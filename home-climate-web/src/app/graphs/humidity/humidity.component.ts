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
		{ data: [], label: 'Humidity', backgroundColor: "#CBF3F9" }
	];

	public chartLabels: Label[] = [];
	private index = 0;

	constructor (private climateService: ClimateService) { }

	public ngOnInit(): void {
		this.climateService.$climate
			.pipe(
				map(h => h.humidity)
			)
			.subscribe((humidity) => {
				this.chartData[0].data.push(humidity);
				this.chartLabels.push((this.index++).toString());
			});
	}
}