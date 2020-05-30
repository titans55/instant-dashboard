import { BarChartDataOptions } from '../bar-chart/model/bar-chart-options';
import { GaugeChartDataOptions } from '../gauge/model/gauge-chart-data';
import { BaseDataTypes } from '../../model/dashboard-options';

export type ChartTypes = 'bar' | 'gauge';
export type AllSupportedDataTypes = BaseDataTypes | 'string[]';

export interface SupportedChartType<T extends AllSupportedDataTypes> {
  type: ChartTypes;
  dataType: T;
}

export type ChartDataOptionsTypes = BarChartDataOptions | GaugeChartDataOptions;

export class ChartData<T extends ChartDataOptionsTypes> {
  chartHeader: string;
  chartDataOptions: T;
}
