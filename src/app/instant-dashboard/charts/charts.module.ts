import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartModule } from './bar-chart/bar-chart.module';
import { MatCardModule } from '@angular/material/card';
import { GaugeModule } from './gauge/gauge.module';

@NgModule({
  imports: [CommonModule, MatCardModule, BarChartModule, GaugeModule],
  exports: [BarChartModule, GaugeModule],
})
export class ChartsModule {}
