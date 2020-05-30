import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  peopleInfo;
  constructor(private http: HttpClient) {}

  getPopleInfo(offset?: string) {
    let url: string =
      'https://api.airtable.com/v0/appXi6qYG9M3Xdb7g/PeopleInfo?api_key=keyXwmgj9qCcMklJq';

    return this.http
      .get(url)
      .toPromise()
      .then(async (peopleInfo: any) => {
        this.peopleInfo = peopleInfo;
        while (this.peopleInfo.offset) {
          await this.http
            .get(url + '&offset=' + peopleInfo.offset)
            .toPromise()
            .then((peopleInfoToFetch: any) => {
              this.peopleInfo.offset = peopleInfoToFetch.offset;
              this.peopleInfo.records = this.peopleInfo.records.concat(
                peopleInfoToFetch.records
              );
            });
        }
        console.log('total', peopleInfo);
        return this.peopleInfo.records.map((record) => {
          return record.fields;
        });
      });
  }
}
