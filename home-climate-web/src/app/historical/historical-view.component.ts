import { Component, OnInit } from "@angular/core";
import { HistoricalDataService } from "../services/historical-view.service";

@Component({
	selector: 'historical-view',
	templateUrl: 'historical-view.component.html',
	styleUrls: ['historical-view.component.css']
})
export class HistoricalViewComponent implements OnInit{

 	public data = []
	constructor (private historicalDataService: HistoricalDataService) { }

	ngOnInit(): void {
		this.historicalDataService.getHistoricalData()
			.subscribe((data) => {
				console.log(data)
				this.data = data;
			})
	}
}