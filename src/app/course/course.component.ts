import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay, debounce, bufferTime
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    courseId: string;

    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;

    prev: any;
    curr: any;


    @ViewChild('searchInput', { static: true }) input: ElementRef;
    // @ViewChild('clickMe') clickMe: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

        this.courseId = this.route.snapshot.params['id'];

        this.course$ = createHttpObservable(`/api/courses/${this.courseId}`);


    }

    ngAfterViewInit() {

        // const clickMe$ = fromEvent<any>(this.clickMe.nativeElement, 'click').pipe(
        //     bufferTime(3000),
        //     tap(event => {
        //         console.log(event.length);
        //     }),
        // );
        // clickMe$.subscribe();


        const searchLessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                // tap(event => console.log(event)),
                map(event => event.target.value),
                debounceTime(600),
                distinctUntilChanged(),
                switchMap(search => this.loadLessons(search))
            );

        const initialLessons$ = this.loadLessons();

        this.lessons$ = concat(initialLessons$, searchLessons$);
    }

    private loadLessons(search = ''): Observable<Lesson[]> {
        return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
        .pipe(
            map(res => res['payload'])
        );
    }

}
