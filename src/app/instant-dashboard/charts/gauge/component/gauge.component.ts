import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';
import * as d3 from 'd3';
import { ChartData } from '../../model/base-charts-options';
import { GaugeChartDataOptions } from '../model/gauge-chart-data';
declare let Chart: any;

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
})
export class GaugeComponent implements AfterViewInit {
  @Input() chartData: ChartData<GaugeChartDataOptions>;

  // @ViewChild('chart')
  // myChart: ElementRef<HTMLElement>;

  @ViewChild('chartjsgauge')
  gaugecanvas: ElementRef<HTMLCanvasElement>;

  ctx: CanvasRenderingContext2D;

  constructor() {}

  ngAfterViewInit() {
    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          let ctx = chart.chart.ctx;

          //Get options from the center object in options
          let centerConfig = chart.config.options.elements.center;
          let fontStyle = centerConfig.fontStyle || 'Arial';
          let txt = centerConfig.text;
          let color = centerConfig.color || '#000';
          let sidePadding = centerConfig.sidePadding || 20;
          let sidePaddingCalculated =
            (sidePadding / 100) * (chart.innerRadius * 2);
          //Start with a base font of 30px
          ctx.font = '30px ' + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          let stringWidth = ctx.measureText(txt).width;
          let elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          let widthRatio = elementWidth / stringWidth;
          let newFontSize = Math.floor(widthRatio * 23);
          let elementHeight = chart.innerRadius * 2;

          // Pick a new font size so it will not be larger than the height of label.
          let fontSizeToUse = Math.min(newFontSize, elementHeight);

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          let centerX = (chart.chartArea.left + chart.chartArea.right) / 2 + 4;
          let centerY = chart.chartArea.bottom - chart.innerRadius / 4;
          ctx.font = fontSizeToUse + 'px ' + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      },
    });

    const percentage: number =
      (this.chartData.chartDataOptions.value /
        this.chartData.chartDataOptions.rangeMax) *
      100;
    // this.setGaugeValue(this.myChart.nativeElement, percentage);

    this.ctx = this.gaugecanvas.nativeElement.getContext('2d');

    const chartjsGauge = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [percentage, 100 - percentage],
            backgroundColor: ['#407294', '#d9d9d9'],
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        responsive: true,
        display: true,
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        plugins: {
          datalabels: {
            display: false,
          },
        },
        elements: {
          center: {
            text: percentage.toFixed() + '%',
            fontStyle: 'Roboto', // Default is Arial
            sidePadding: 20, // Defualt is 20 (as a percentage)
          },
        },
      },
    });
  }
}
