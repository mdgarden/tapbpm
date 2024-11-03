import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {
    // BPM(Beats Per Minute) 계산을 위한 기본 공식은:
    // BPM = (60 seconds / time interval between beats in seconds)
    // 예를 들어:
    // 두 번의 탭 사이가 0.5초라면: 60 / 0.5 = 120 BPM
    //두 번의 탭 사이가 1초라면: 60 / 1 = 60 BPM
  }
}
