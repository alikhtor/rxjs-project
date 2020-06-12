import { Component, OnInit } from '@angular/core';
import { of, scheduled, concat } from 'rxjs';
import { concatAll } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const source1$ = of(1, 2, 3);
    const source2$ = of(4, 5, 6);

    const res$ = concat(source2$, source1$);

    res$.subscribe(console.log);
  }

}
