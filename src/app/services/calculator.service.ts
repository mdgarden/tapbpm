import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private intervals: number[] = [];
  private accuracy: number = 20; // 평균값 배열의 길이
  private bpmSubject = new BehaviorSubject<number>(0);
  bpm$ = this.bpmSubject.asObservable();
  averageInterval = 0;

  constructor() {}

  get bpm(): number {
    return this.bpmSubject.value;
  }

  calculateBpm(interval: number) {
    this.intervals.push(interval);

    if (this.intervals.length > this.accuracy) {
      this.intervals = this.intervals.slice(1);
    }

    this.averageInterval = this.intervals.reduce((cur, acc) => {
      return (cur + acc) / 2;
    }, 0);

    const newBpm = Math.round(60000 / this.averageInterval);

    this.bpmSubject.next(newBpm);
  }
}
