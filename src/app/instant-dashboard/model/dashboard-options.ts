import { SupportedChartType } from '../charts/model/base-charts-options';
import { BarChartDetails } from '../charts/bar-chart/model/bar-chart-options';
import {
  GaugeSupportedTSDatatypes,
  GaugeChartDetails,
} from '../charts/gauge/model/gauge-chart-data';

type ChartDetails =
  | BarChartDetails
  | GaugeChartDetails<GaugeSupportedTSDatatypes>;

export type BaseDataTypes = 'boolean' | 'number' | 'string';

export class ChartOptions<T> {
  chartHeader: string;
  chartFooter?: string;
  dataField: keyof T;
  chartDetails: ChartDetails;
}

class CachingOptions {
  enabled: boolean = false;
  localStorageKey: string;
}

class FilteringOptions<T> {
  enabled: boolean = false;
  filterDataField: keyof T;
  filterCaption: string;
}

export class DashboardOptions<T> {
  dashboardName: string;
  dataSource: Array<T>;
  charts: Array<ChartOptions<T>>;
  filteringOptions?: FilteringOptions<T>;
}
