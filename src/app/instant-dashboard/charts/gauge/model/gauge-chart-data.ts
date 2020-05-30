import {
  SupportedChartType,
  AllSupportedDataTypes,
} from '../../model/base-charts-options';
import { BaseDataTypes } from 'src/app/instant-dashboard/model/dashboard-options';
import { ConditionEnums } from './enum/ConditionEnums.enum';

export type GaugeSupportedTSDatatypes = boolean | number | string;
function isGaugeSupportedTSDatatypes(obj: any): obj is GaugeChartDataOptions {
  return (
    typeof obj == 'boolean' || typeof obj == 'number' || typeof obj == 'string'
  );
}

export type ArrayLengthConditionFormat = ['length', ConditionEnums, number];
export function isArrayLengthConditionFormat(
  obj: Array<any>
): obj is ArrayLengthConditionFormat {
  return (
    obj.length == 3 &&
    obj[0] == 'length' &&
    Object.values(ConditionEnums).includes(obj[1]) &&
    typeof obj[2] == 'number'
  );
}

export type ArrayIncludesConditionFormat<
  T extends GaugeSupportedTSDatatypes
> = ['includes', T];
export function isArrayIncludesConditionFormat(
  obj: Array<any>
): obj is ArrayIncludesConditionFormat<GaugeSupportedTSDatatypes> {
  return (
    obj.length == 2 &&
    obj[0] == 'includes' &&
    isGaugeSupportedTSDatatypes(obj[1])
  );
}

export type ObjectConditionFormat<T extends GaugeSupportedTSDatatypes> = [
  ConditionEnums,
  T
];
export function isObjectConditionFormat(
  obj: Array<any>
): obj is ObjectConditionFormat<GaugeSupportedTSDatatypes> {
  return (
    obj.length == 2 &&
    Object.values(ConditionEnums).includes(obj[0]) &&
    isGaugeSupportedTSDatatypes(obj[1])
  );
}

export type ConditonFormat<T extends GaugeSupportedTSDatatypes> =
  | ObjectConditionFormat<T>
  | ArrayLengthConditionFormat
  | ArrayIncludesConditionFormat<T>;

export class GaugeChartDetails<T extends GaugeSupportedTSDatatypes>
  implements SupportedChartType<AllSupportedDataTypes> {
  dataType: AllSupportedDataTypes;
  type: 'gauge';
  condition?: ConditonFormat<T>;
}

export class GaugeChartDataOptions extends GaugeChartDetails<
  GaugeSupportedTSDatatypes
> {
  type: 'gauge';
  value: number;
  rangeMax?: number = 100;
  rangeMin?: number = 0;
}
