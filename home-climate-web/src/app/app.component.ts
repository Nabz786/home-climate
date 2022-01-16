import { Component, OnInit } from '@angular/core';
import { ClimateService } from '../app/services/climate-service.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	
	constructor(private climateService: ClimateService) { }

	ngOnInit(): void {
		this.climateService.initializeService();
	}
}
