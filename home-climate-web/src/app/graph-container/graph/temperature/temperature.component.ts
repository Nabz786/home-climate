import { Component, OnInit } from "@angular/core";
import { ClimateService } from "../../../services/climate-service.service";
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
		{ data: [], label: 'Temperature' },
	];

	public chartLabels: Label[] = [];

	private index = 0;

	constructor(private climateService: ClimateService) { }
	
	public ngOnInit(): void {
		this.climateService.$climate
			.pipe(
				map(c => c.temp)
			)
			.subscribe((temperature: any) => {
				this.chartData[0].data.push(temperature);
				this.chartLabels.push((this.index++).toString());
			})
	}

}