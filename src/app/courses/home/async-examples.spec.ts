import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";

describe("Async Testing Examples", () => {
  it("Asynchronous test example with Jasmine done()", (done: DoneFn) => {

    let test = false;
    setTimeout(()=> {
      // console.log('running assertions')
      test = true
      expect(test).toBeTruthy()
      done()
    }, 1000)

  } )

  it("Asynchronous test example using fakeAsync and tick -- setTimeout()", fakeAsync(() => {

    let test = false;

    setTimeout(()=> {
      // console.log('running assertions')
      test = true
      expect(test).toBeTruthy()
    }, 1000)

    tick(1000)
    expect(test).toBeTruthy()

  }))

  it("Asynchronous test example using fakeAsync and flush -- setTimeout()", fakeAsync(() => {

    let test = false;

    setTimeout(()=> {
      // console.log('running assertions')
      test = true
      expect(test).toBeTruthy()
    }, 1000)

    flush()
    expect(test).toBeTruthy()

  }))

  it('Asynchronous test example - plain Promise', fakeAsync(() => {

        let test = false;

        console.log('Creating Promise')

        // setTimeout(() => {
        //   console.log('setTimeout() first callback triggered.')
        // })
        // setTimeout(() => {
        //   console.log('setTimeout() second callback triggered.')
        // })

        Promise.resolve().then(() => {
          console.log('Promise first then() evaluated successfully')

          test = true

          return Promise.resolve()
        }).then(() => {
          console.log('Promise second then() evaluated successfully')
        })
        // promise가 setTImeout 보다 먼저 실행됨
        flushMicrotasks()

        console.log('Running test assertions')

        expect(test).toBeTruthy()


  }))
})
