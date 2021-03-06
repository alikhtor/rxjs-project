import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, Observable, of, timer, Observer, noop, throwError} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public beginnerCourses$: Observable<Course[]>;
    public advancedCourses$: Observable<Course[]>;


    constructor() {

    }

    ngOnInit() {

        const http$ = createHttpObservable('/api/courses/');

        const courses$: Observable<Course[]> = http$.pipe(
            map(res => Object.values(res['payload'])),
            shareReplay<Course[]>(),
            catchError(err => {
                console.log(err);
                return throwError(err);
            })
        );

        this.beginnerCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category === 'BEGINNER'))
        );
        this.advancedCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category === 'ADVANCED'))
        );
    }

}
