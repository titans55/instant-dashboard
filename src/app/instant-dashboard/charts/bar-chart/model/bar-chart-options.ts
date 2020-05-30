import { SupportedChartType } from '../../model/base-charts-options';
import { BaseDataTypes } from 'src/app/instant-dashboard/model/dashboard-options';

class SortByOptions {
  enabled: boolean = false;
  desc?: boolean = false;
}

export class BarChartDetails implements SupportedChartType<BaseDataTypes> {
  type: 'bar';
  dataType: BaseDataTypes;
  sortByOptions: SortByOptions;
  percentageFormatEnabled?: boolean = false;
}

export class BarChartDataOptions extends BarChartDetails {
  labels: Array<string>;
  data: Array<number>;
}
