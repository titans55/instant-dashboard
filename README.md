# instant-dashboard

Create your customizable visualization dashboard within seconds (currently bar and gauge charts supported)

[This dashboard](https://titans55.github.io/instant-dashboard/) created using the configuration below.

[Click to see PeopleInfo class](https://github.com/titans55/instant-dashboard/blob/master/src/app/demo/model/person-info.ts)

```typescript
   {
      dashboardName: 'Diversity at Dummy Tech',
      dataSource: this.peopleInfo,
      filteringOptions: {
        enabled: true,
        filterDataField: 'role',
        filterCaption: 'Role',
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
          chartHeader: 'Peope who speak less then 3 languages',
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
    };'
```
