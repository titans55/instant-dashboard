import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { DashboardOptions, ChartOptions } from '../model/dashboard-options';
import {
  ChartData,
  ChartDataOptionsTypes,
} from '../charts/model/base-charts-options';
import { BarChartDataOptions } from '../charts/bar-chart/model/bar-chart-options';
import {
  GaugeChartDataOptions,
  ConditonFormat,
  ArrayLengthConditionFormat,
  isArrayLengthConditionFormat,
  isArrayIncludesConditionFormat,
  isObjectConditionFormat,
  GaugeSupportedTSDatatypes,
} from '../charts/gauge/model/gauge-chart-data';

@Component({
  selector: 'instant-dashboard',
  templateUrl: './instant-dashboard.component.html',
  styleUrls: ['./instant-dashboard.component.css'],
})
export class InstantDashboardComponent implements OnChanges, OnInit {
  selectedFilter;
  filterOptions: Array<any> = [];
  private filterOptionsFilled: boolean = false;

  breakpoint: number;
  chartsData: Array<ChartData<ChartDataOptionsTypes>> = [];

  @Input() dashboardOptions: DashboardOptions<any>;

  constructor() {}

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 400 ? 1 : 6;
  }

  ngOnChanges() {
    this.initDashboard();
  }

  private initDashboard(): void {
    if (this.dashboardOptions) {
      for (
        let recordIndex = 0;
        recordIndex < this.dashboardOptions.dataSource.length;
        recordIndex++
      ) {
        const record = this.dashboardOptions.dataSource[recordIndex];
        let chartIndex = 0;
        if (
          !this.filterOptionsFilled &&
          this.dashboardOptions.filteringOptions &&
          this.dashboardOptions.filteringOptions.enabled
        ) {
          this.fillSelectOptions(
            record[this.dashboardOptions.filteringOptions.filterDataField]
          );
        }
        if (this.filterOptionsFilled && this.selectedFilter) {
          if (
            record[this.dashboardOptions.filteringOptions.filterDataField] !=
            this.selectedFilter
          ) {
            continue;
          }
        }
        this.dashboardOptions.charts.forEach((chart) => {
          this.fillChartData(
            record[chart.dataField],
            chartIndex,
            chart,
            recordIndex
          );
          chartIndex += 1;
        });
      }

      this.filterOptionsFilled = true;
      console.log('chartsData', this.chartsData);
    }
  }

  filterSelectionChange() {
    console.log(this.selectedFilter);
    this.chartsData = [];
    this.initDashboard();
  }

  fillSelectOptions(filterData) {
    if (!this.filterOptions.includes(filterData)) {
      this.filterOptions.push(filterData);
    }
  }

  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 400 ? 1 : 6;
  }

  fillChartData(
    dataToInsert,
    chartIndex: number,
    chart: ChartOptions<any>,
    recordIndex: number
  ) {
    if (dataToInsert == null) {
      //handle null data
      switch (chart.chartDetails.dataType) {
        case 'number':
          dataToInsert = 0;
          return;
          break;

        case 'boolean':
          dataToInsert = false;
          break;

        case 'string':
          dataToInsert = 'unknown';
          break;
      }
    }

    if (dataToInsert != null) {
      switch (chart.chartDetails.type) {
        case 'bar':
          if (this.chartsData[chartIndex] == null) {
            this.chartsData.push({
              chartHeader: chart.chartHeader,
              chartDataOptions: {
                dataType: chart.chartDetails.dataType,
                type: chart.chartDetails.type,
                labels: [],
                data: [],
                sortByOptions: chart.chartDetails.sortByOptions,
              },
            });
          }
          let barChartDataOptions = <BarChartDataOptions>(
            this.chartsData[chartIndex].chartDataOptions
          );
          switch (chart.chartDetails.dataType) {
            case 'number':
              if (dataToInsert >= 20 && dataToInsert < 40) {
                if (barChartDataOptions.data[0] == null) {
                  barChartDataOptions.data[0] = 1;
                  if (barChartDataOptions.labels[0] == null) {
                    barChartDataOptions.labels[0] = '20 - 40';
                  }
                } else {
                  barChartDataOptions.data[0] += 1;
                }
              } else if (dataToInsert >= 40 && dataToInsert < 60) {
                if (barChartDataOptions.data[1] == null) {
                  barChartDataOptions.data[1] = 1;
                  if (barChartDataOptions.labels[1] == null) {
                    barChartDataOptions.labels[1] = '40 - 60';
                  }
                } else {
                  barChartDataOptions.data[1] += 1;
                }
              } else if (dataToInsert >= 60 && dataToInsert < 100) {
                if (barChartDataOptions.data[2] == null) {
                  barChartDataOptions.data[2] = 1;
                  if (barChartDataOptions.labels[2] == null) {
                    barChartDataOptions.labels[2] = '60 - 100';
                  }
                } else {
                  barChartDataOptions.data[2] += 1;
                }
              }

              break;

            case 'boolean':
              break;

            case 'string':
              let indexOfDataInLabels = barChartDataOptions.labels.indexOf(
                dataToInsert
              );
              if (indexOfDataInLabels == -1) {
                barChartDataOptions.labels.push(dataToInsert);
                barChartDataOptions.data.push(0);
              } else {
                barChartDataOptions.data[indexOfDataInLabels] += 1;
              }
          }
          break;

        case 'gauge':
          if (this.chartsData[chartIndex] == null) {
            this.chartsData.push({
              chartHeader: chart.chartHeader,
              chartDataOptions: {
                dataType: chart.chartDetails.dataType,
                type: chart.chartDetails.type,
                value: 0,
                rangeMax: 0,
                rangeMin: 0,
              },
            });
          }

          let gaugechartDataOptions = <GaugeChartDataOptions>(
            this.chartsData[chartIndex].chartDataOptions
          );
          gaugechartDataOptions.rangeMax += 1;

          this.processGaugeChartDataOptionsValue(
            dataToInsert,
            gaugechartDataOptions,
            chart.chartDetails.condition
          );

          break;
      }
    }
  }

  processGaugeChartDataOptionsValue(
    dataToInsert,
    gaugechartDataOptions: GaugeChartDataOptions,
    conditionToEval: ConditonFormat<GaugeSupportedTSDatatypes>
  ) {
    if (conditionToEval) {
      if (isArrayLengthConditionFormat(conditionToEval)) {
        if (
          eval(
            'dataToInsert.length ' +
              conditionToEval[1] +
              ' ' +
              conditionToEval[2]
          )
        ) {
          gaugechartDataOptions.value += 1;
        }
      } else if (isArrayIncludesConditionFormat(conditionToEval)) {
        if (dataToInsert.includes(conditionToEval[1])) {
          gaugechartDataOptions.value += 1;
        }
      } else if (isObjectConditionFormat(conditionToEval)) {
        if (
          eval(
            'dataToInsert ' +
              conditionToEval[0] +
              ' ' +
              this.addQuotesIfString(conditionToEval[1])
          )
        ) {
          gaugechartDataOptions.value += 1;
        }
      }
    } else {
      gaugechartDataOptions.value += 1;
    }
  }

  addQuotesIfString(obj) {
    if (typeof obj == 'string') {
      return '"' + obj + '"';
    }
    return obj;
  }

  private processNumbersBarChart(
    barChartDataOptions: BarChartDataOptions
  ): BarChartDataOptions {
    let chunkedArray = this.splitArray(barChartDataOptions.data);
    debugger;
    let data = chunkedArray.map((a) => {
      return a.length;
    });
    barChartDataOptions.data = data;
    barChartDataOptions.labels = [
      chunkedArray[0][0].toString() +
        ' - ' +
        chunkedArray[0][chunkedArray[0].length - 1].toString(),
      chunkedArray[1][0].toString() +
        ' - ' +
        chunkedArray[1][chunkedArray[1].length - 1].toString(),
      chunkedArray[2][0].toString() +
        ' - ' +
        chunkedArray[2][chunkedArray[2].length - 1].toString(),
    ];
    return barChartDataOptions;
  }

  private splitArray(array: Array<number>): Array<Array<number>> {
    array = JSON.parse(JSON.stringify(array));
    array.sort((a, b) => a - b);
    let temp: Array<Array<number>> = [[], [], []];
    let i = 0;
    while (array[i] < 30) {
      temp[0].push(array[i]);
      i++;
    }
    while (array[i] < 45) {
      temp[1].push(array[i]);
      i++;
    }
    while (i < array.length) {
      temp[2].push(array[i]);
      i++;
    }
    return temp;
  }
}
