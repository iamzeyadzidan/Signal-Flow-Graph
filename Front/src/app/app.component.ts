import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular8-springboot-websocket';

  greeting: any;
  name: string;
  
  ngOnInit() {
    /*
    this.webSocketAPI = new WebSocketAPI(new AppComponent());
    */
  }

  
}
