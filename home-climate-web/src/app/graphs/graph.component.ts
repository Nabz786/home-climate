import { Component, Input } from "@angular/core";
import { ChartDataSets } from "chart.js";
import { Color, Label } from "ng2-charts";

@Component({
	selector: "graph",
	templateUrl: "./graph.component.html",
	styleUrls: ["./graph.component.css"]
})
export class GraphComponent {
	@Input() dataSets: ChartDataSets[];
	@Input() labels: Label[];
	@Input() colors: Color[];
	@Input() legend: boolean;
	@Input() chartType: string;
	// @Input() plugins: any[];

	public options: any = {
		animation: {duration: 2000},
		scales : {
			yAxes: [{
				gridLines: {
					display:false
				},
				ticks: {
					beginAtZero: true,
					//stepValue: 10,
					steps: 10,
				  	max : 100,
				}
			}]
		  }
	};
}