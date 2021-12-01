
import { TestBed } from '@angular/core/testing'
import {HttpTestingController , HttpClientTestingModule } from '@angular/common/http/testing'
import {CoursesService} from './courses.service'

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

  })

})
