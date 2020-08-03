import { Observable, Observer } from "rxjs";
import { request } from "express";


export function createHttpObservable(url: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {

        const controller = new AbortController();
        const signal = controller.signal;

        fetch(url, {signal})
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              observer.error(`request failed with status code ${response.status}`);
            }
          })
          .then(body => {
            // console.log(body);
            observer.next(body);
            observer.complete();
          })
          .catch(err => {
            // console.log(err);
            observer.error(err);
          });

        return () => controller.abort();
      });
}
