import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';
import * as Chart from 'chart.js';
import { BarChartDataOptions } from '../model/bar-chart-options';
import { ChartData } from '../../model/base-charts-options';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements AfterViewInit {
  readonly colors = [
    '#bada55',
    '#696969',
    '#407294',
    '#F7347A',
    '#00ffff',
    '#800080',
  ];

  @Input() chartData: ChartData<BarChartDataOptions>;

  @ViewChild('myCanvas')
  myCanvas: ElementRef<HTMLCanvasElement>;

  canvas: any;
  ctx: CanvasRenderingContext2D;

  constructor() {}

  ngAfterViewInit(): void {
    if (
      this.chartData.chartDataOptions.sortByOptions &&
      this.chartData.chartDataOptions.sortByOptions.enabled
    ) {
      this.sortTwoArraysBasedOnFirst(
        this.chartData.chartDataOptions.data,
        this.chartData.chartDataOptions.labels,
        this.chartData.chartDataOptions.sortByOptions.desc
      );
    }

    let bgColors = [];
    for (var i = 0; i < this.chartData.chartDataOptions.data.length; i++) {
      bgColors.push(this.colors[i % this.colors.length]);
    }
    if (this.chartData) {
      this.ctx = this.myCanvas.nativeElement.getContext('2d');
      let myChart = new Chart(this.ctx, {
        type: 'horizontalBar',
        data: {
          labels: this.chartData.chartDataOptions.labels,
          datasets: [
            {
              data: this.chartData.chartDataOptions.data,
              backgroundColor: bgColors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          responsive: true,
          display: true,
        },
      });
    }
  }

  generateColors(length: number) {
    let colors = [];
    while (colors.length < length) {
      colors.push(`rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`);
    }
  }

  sortTwoArraysBasedOnFirst(
    first: Array<any>,
    second: Array<any>,
    descending: boolean
  ) {
    //1) combine the arrays:
    let list = [];
    for (let j = 0; j < first.length; j++)
      list.push({ first: first[j], second: second[j] });

    //2) sort:
    list.sort(function (a, b) {
      let ascendingSort = a.first < b.first ? -1 : a.first == b.first ? 0 : 1;
      if (descending)
        return ascendingSort == 1 ? -1 : ascendingSort == -1 ? 1 : 0;
      return a.first < b.first ? -1 : a.first == b.first ? 0 : 1;
      //Sort could be modified to, for example, sort on the second
      // if the first is the same.
    });

    //3) separate them back out:
    for (let k = 0; k < list.length; k++) {
      first[k] = list[k].first;
      second[k] = list[k].second;
    }
  }
}

// random number generator
function rand(frm, to) {
  return ~~(Math.random() * (to - frm)) + frm;
}
