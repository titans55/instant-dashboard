import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  readonly localStoragePeopleInfoKey = 'localStoragePeopleInfoKey';

  constructor(private http: HttpClient) {}

  async getPopleInfo(offset?: string) {
    let peopleInfo = JSON.parse(
      localStorage.getItem(this.localStoragePeopleInfoKey)
    );
    console.log(peopleInfo);
    if (peopleInfo == null) {
      let url: string =
        'https://api.airtable.com/v0/appXi6qYG9M3Xdb7g/PeopleInfo?api_key=keyXwmgj9qCcMklJq';

      await this.http
        .get(url)
        .toPromise()
        .then(async (responePeopleInfo: any) => {
          peopleInfo = responePeopleInfo;
          while (peopleInfo.offset) {
            await this.http
              .get(url + '&offset=' + peopleInfo.offset)
              .toPromise()
              .then((peopleInfoToFetch: any) => {
                peopleInfo.offset = peopleInfoToFetch.offset;
                peopleInfo.records = peopleInfo.records.concat(
                  peopleInfoToFetch.records
                );
              });
          }
          console.log('total', peopleInfo);
          localStorage.setItem(
            this.localStoragePeopleInfoKey,
            JSON.stringify(peopleInfo)
          );
        });
    }

    return peopleInfo.records.map((record) => {
      return record.fields;
    });
  }
}
