
import { TestBed } from '@angular/core/testing'
import {HttpTestingController , HttpClientTestingModule } from '@angular/common/http/testing'
import {CoursesService} from './courses.service'

import { COURSES } from '../../../../server/db-data'

describe('CoursesService', () => {

  let coursesService : CoursesService, httpTestingController : HttpTestingController

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CoursesService,
      ]
    })

    coursesService = TestBed.inject(CoursesService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })


  it('should retrieve all courses', () => {

    // 바로 실제 서버에 요청되지 않음
    // req.flush가 실행되면 구독이 시작됨
    coursesService.findAllCourses().subscribe(courses => {

      expect(courses).toBeTruthy('No courses returned')

      expect(courses.length).toBe(12, "incorrect number of courses")

      const course = courses.find(course => course.id == 12)

      expect(course.titles.description).toBe("Angular Testing Course")

    })

    // /api/courses in findAllCourses method of CoursesService
    // `expectOne()`은 HTTP 요청의 URL과 매칭됩니다.
    // 이 주소로 HTTP 요청이 발생하지 않거나 여러번 요청되면 에러를 반환합니다.
    const req = httpTestingController.expectOne('/api/courses')

    // HTTP 요청 방식이 GET인지 검사합니다.
    expect(req.request.method).toEqual('GET')

    // 목업 데이터로 응답을 보내면 옵저버블이 종료됩니다.
    // 옵저버블로 받은 데이터는 구독 함수에서 검사합니다.
    req.flush({payload: Object.values(COURSES)})


    httpTestingController.verify();
  })

})
