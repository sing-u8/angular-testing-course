
import { HttpClient } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import {CoursesService} from './courses.service'

describe('CoursesService', () => {

  let coursesService : CoursesService

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        CoursesService,

      ]
    })

    // coursesService = TestBed.inject(CoursesService)
  })


  it('should retrieve all courses', () => {

  })

})
