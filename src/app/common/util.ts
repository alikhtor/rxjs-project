import { Observable, Observer } from "rxjs";


export function createHttpObservable(url: string) {
    return Observable.create((observer: Observer<any>) => {
        fetch(url)
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
      });
}
