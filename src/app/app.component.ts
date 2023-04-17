import { AfterViewInit, Component, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, AfterViewInit, OnDestroy {
  title = 'Gestão de tarefas';

  ngOnChanges(changes: SimpleChanges) {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

}