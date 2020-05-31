import { Component, OnInit } from '@angular/core';
import { DemoService } from '../service/demo.service';
import { DashboardOptions } from 'src/app/instant-dashboard/model/dashboard-options';
import { PersonInfoModel } from '../model/person-info';
import { ConditionEnums } from 'src/app/instant-dashboard/charts/gauge/model/enum/ConditionEnums.enum';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements OnInit {
  peopleInfo: Array<PersonInfoModel>;
  diversityDashboardOptions: DashboardOptions<PersonInfoModel>;
  constructor(private service: DemoService) {}

  async ngOnInit() {
    await this.service
      .getPopleInfo()
      .then((peopleInfo: Array<PersonInfoModel>) => {
        this.peopleInfo = peopleInfo;
      });

    this.diversityDashboardOptions = {
      dashboardName: 'Diversity at Dummy Tech',
      dataSource: this.peopleInfo,
      filteringOptions: {
        enabled: true,
        filterDataField: 'role',
        filterCaption: 'Role',
      },
      cachingOptions: {
        enabled: true,
        localStorageKey: 'PeopleInfo',
      },
      charts: [
        {
          chartHeader: 'LGBTQIA',
          dataField: 'gender',
          chartDetails: {
            type: 'gauge',
            dataType: 'string',
            condition: [ConditionEnums.EQUALS_TO, 'LGBTQIA'],
          },
        },
        {
          chartHeader: 'Has a disability',
          dataField: 'hasDisability',
          chartDetails: {
            type: 'gauge',
            dataType: 'boolean',
            condition: [ConditionEnums.EQUALS_TO, true],
          },
        },
        {
          chartHeader: 'Multilingual speakers',
          dataField: 'language',
          chartDetails: {
            type: 'gauge',
            dataType: 'string[]',
            condition: ['length', ConditionEnums.GTE, 1],
          },
        },
        {
          chartHeader: 'English speakers',
          dataField: 'language',
          chartDetails: {
            type: 'gauge',
            dataType: 'string[]',
            condition: ['includes', 'English'],
          },
        },
        {
          chartHeader: 'People who speak less then 3 languages',
          dataField: 'language',
          chartDetails: {
            type: 'gauge',
            dataType: 'string[]',
            condition: ['length', ConditionEnums.LTE, 3],
          },
        },
        {
          chartHeader: 'Served in the military',
          dataField: 'servedInMilitary',
          chartDetails: {
            type: 'gauge',
            dataType: 'boolean',
            condition: [ConditionEnums.EQUALS_TO, true],
          },
        },
        {
          chartHeader: 'Gender',
          dataField: 'gender',
          chartDetails: {
            type: 'bar',
            dataType: 'string',
            sortByOptions: {
              enabled: true,
              desc: true,
            },
          },
        },
        {
          chartHeader: 'Ethnicity',
          dataField: 'ethnicity',
          chartDetails: {
            type: 'bar',
            dataType: 'string',
            sortByOptions: {
              enabled: true,
              desc: true,
            },
          },
        },
        {
          chartHeader: 'Age',
          dataField: 'age',
          chartDetails: {
            dataType: 'number',
            type: 'bar',
            sortByOptions: {
              enabled: false,
            },
          },
        },
        {
          chartHeader: 'Location',
          dataField: 'location',
          chartDetails: {
            dataType: 'string',
            type: 'bar',
            sortByOptions: {
              enabled: true,
              desc: true,
            },
          },
        },
        {
          chartHeader: 'Family status',
          dataField: 'familyStatus',
          chartDetails: {
            dataType: 'string',
            type: 'bar',
            sortByOptions: {
              enabled: false,
            },
          },
        },
      ],
    };
  }
}
