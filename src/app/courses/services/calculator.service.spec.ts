import {LoggerService} from './logger.service'
import {CalculatorService} from './calculator.service'

describe('CalculatorService', () => {
  let calculator: CalculatorService, loggerSpy : any

  beforeEach(() => {
    console.log('Calling beforeEach')
    loggerSpy = jasmine.createSpyObj('LoggerService', ["log"])
    calculator = new CalculatorService(loggerSpy)
  })

  it('should add two numbers', () => {
    console.log('add test number')
    const result = calculator.add(2,2)
    expect(result).toBe(4)
    expect(loggerSpy.log).toHaveBeenCalledTimes(1)
  })

  it('should subtract two numbers', () => {
    console.log('add test number')
    const result = calculator.subtract(2,2)
    expect(result).toBe(0)
    expect(loggerSpy.log).toHaveBeenCalledTimes(1)
  })

})
