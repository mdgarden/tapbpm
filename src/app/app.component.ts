import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalculatorService } from './services/calculator.service';
import {
  fromEvent,
  map,
  Observable,
  pairwise,
  Subject,
  takeUntil,
  Timestamp,
  timestamp,
} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tapbpm';
  count = 0;
  private destroy$ = new Subject<void>();

  constructor(private calculator: CalculatorService) {}

  get currentBPM(): number {
    return this.calculator.bpm;
  }

  keys$(): Observable<number> {
    return fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      takeUntil(this.destroy$),
      timestamp(),
      map((e: Timestamp<KeyboardEvent>) => e.timestamp),
      pairwise(),
      map(([first, second]) => second - first)
    );
  }

  ngOnInit(): void {
    this.keys$().subscribe((interval) => {
      this.count = interval;
      this.calculator.calculateBpm(interval);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
