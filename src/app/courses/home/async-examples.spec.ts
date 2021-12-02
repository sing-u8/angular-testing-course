import { fakeAsync, tick } from "@angular/core/testing";

describe("Async Testing Examples", () => {
  it("Asynchronous test example with Jasmine done()", (done: DoneFn) => {

    let test = false;
    setTimeout(()=> {
      console.log('running assertions')
      test = true
      expect(test).toBeTruthy()
      done()
    }, 1000)

  } )

  it("Asynchronous test example using fakeAsync and tick -- setTimeout()", fakeAsync(() => {

    let test = false;

    setTimeout(()=> {
      console.log('running assertions')
      test = true
      expect(test).toBeTruthy()
    }, 1000)

    tick(1000)
    expect(test).toBeTruthy()

  }))
})
