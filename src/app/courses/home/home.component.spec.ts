import {waitForAsync, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursesService: any

  const beginnerCourses = setupCourses().filter(
    course => course.category == "BEGINNER"
  )
  const advancedCourses = setupCourses().filter(
    course => course.category == "ADVANCED"
  )

  // beforeAll(() => {
  //   jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000
  // })

  beforeEach(waitForAsync(() => {  // fakeAsync를 쓰려면 마지막에 flushMicrotasks()를 호출해야함.

    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses'])

    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule // no operation animation
      ],
      providers: [
        {provide: CoursesService, useValue: coursesServiceSpy }
      ]
    }).compileComponents()
    .then(()=> {
      fixture = TestBed.createComponent(HomeComponent)
      component = fixture.componentInstance
      el = fixture.debugElement
      coursesService = TestBed.inject(CoursesService)
    })

  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });


  it("should display only beginner courses", () => {

      coursesService.findAllCourses.and.returnValue( of(beginnerCourses) ) // returning courses[beginnerCourses] is not abservable!
      fixture.detectChanges()
      const tabs = el.queryAll(By.css('.mat-tab-label'))
      expect(tabs.length).toBe(1, "Unexpected number of tabs found")

  });


  it("should display only advanced courses", () => {

    coursesService.findAllCourses.and.returnValue(of(advancedCourses))
    fixture.detectChanges()
    const tabs = el.queryAll(By.css(".mat-tab-label"))
    expect(tabs.length).toBe(1, "Unexpected number of tabs found")

  });


  it("should display both tabs", () => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()))
    fixture.detectChanges()
    const tabs = el.queryAll(By.css(".mat-tab-label"))
    expect(tabs.length).toBe(2, "Expected to find 2 tabs")

  });


  it("should display advanced courses when tab clicked 1 - DoneFn", (done: DoneFn) => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()))
    fixture.detectChanges()
    const tabs = el.queryAll(By.css(".mat-tab-label"))
    expect(tabs.length).toBe(2, "Expected to find 2 tabs")


    //  HomeComponent should display advanced courses when tab clicked FAILED errror --> tab container component actually perform async operation when switchin tabs
    el.nativeElement.click() // same to click()
    // click(tabs[1])
    fixture.detectChanges()

    setTimeout(()=> {
      const cardTitles = el.queryAll(By.css('.mat-card-title'))
      expect(cardTitles.length).toBeGreaterThan(0, "could not find card titles")
      expect(cardTitles[0].nativeElement.textContent).toContain( "Angular Testing Course")
      done()
    }, 500)  //! --> 'expect' was used when there was no current spec, this could be because an asynchronous test timed out  without done:DoneFn

  });

  it("should display advanced courses when tab clicked 2 - fakeAsync", fakeAsync(() => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()))
    fixture.detectChanges()
    const tabs = el.queryAll(By.css(".mat-tab-label"))
    expect(tabs.length).toBe(2, "Expected to find 2 tabs")


    //  HomeComponent should display advanced courses when tab clicked FAILED errror --> tab container component actually perform async operation when switchin tabs
    el.nativeElement.click() // same to click()
    // click(tabs[1])
    fixture.detectChanges()

    flush() // tick(16)// --> browser task, settimeout, setinterval, request animation frame // not flushMicrotasks() !! --> async, promise
    // .mat-tab-body-active .mat-card-title
    const cardTitles = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'))
    expect(cardTitles.length).toBeGreaterThan(0, "could not find card titles")
    expect(cardTitles[0].nativeElement.textContent).toContain( "Angular Testing Course")

  }));

  it("should display advanced courses when tab clicked 3 - waitForAsync", waitForAsync(() => { // waitfForAsync support actual http request
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000  // 기본 timeout_interval 안에서 테스트가 끝나지 않아서 시간을 조정

    coursesService.findAllCourses.and.returnValue(of(setupCourses()))
    fixture.detectChanges()
    const tabs = el.queryAll(By.css(".mat-tab-label"))
    expect(tabs.length).toBe(2, "Expected to find 2 tabs")

    el.nativeElement.click() // same to click()
    // click(tabs[1])

    fixture.whenStable().then(() => {
      // console.log("called whenStable")
      // .mat-tab-body-active .mat-card-title
      fixture.detectChanges()
      const cardTitles = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'))
      expect(cardTitles.length).toBeGreaterThan(0, "could not find card titles")
      expect(cardTitles[0].nativeElement.textContent).toContain( "Angular Testing Course")
    })


  }));



});


