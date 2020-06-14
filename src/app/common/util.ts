import { Observable, Observer } from "rxjs";


export function createHttpObservable(url: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {

        const controller = new AbortController();
        const signal = controller.signal;

        fetch(url, {signal})
          .then(response => {
            // console.log(response);
            return response.json();
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
