import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private intervals: number[] = [];
  private accuracy: number = 20; // 평균값 배열의 길이
  bpm = 0;
  averageInterval = 0;

  constructor() {}

  calculateBpm(interval: number) {
    this.calculateAverageInterval(interval);
    this.bpm = 60000 / this.averageInterval;
  }

  private calculateAverageInterval(interval: number) {
    this.intervals.push(interval);

    if (this.intervals.length > this.accuracy) {
      this.intervals = this.intervals.slice(1);
    }

    this.averageInterval = this.intervals.reduce((cur, acc) => {
      return (cur + acc) / 2;
    }, 0);
  }
}
