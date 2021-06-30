import { BehaviorSubject, Subject } from "rxjs"
// Mostly copied from Ben Lesh's implementation here: https://github.com/ReactiveX/rxjs/issues/4740#issuecomment-490601347
// THANK YOU BEN

export class SvelteSubject extends Subject {
  // Enables Svelte bindings and direct assignments, for example:
  // bind:value={$svelteSubj}
  // $svelteSubj = newValue
  // svelteSubj.set(newValue)
  set(value) {
    super.next(value)
  }

  lift(operator) {
    const result = new SvelteSubject()
    result.operator = operator
    result.source = this
    return result
  }

}

export class SvelteBehaviorSubject extends BehaviorSubject {
  // Enables Svelte bindings and direct assignments, for example:
  // bind:value={$svelteBS}
  // $svelteBS = newValue
  // svelteBS.set(newValue)
  set(value) {
    super.next(value)
  }
  
  // Enables calling the Svelte writable's update() method
  // and receiving the current value as an argument for convenience, for example:
  // svelteBS.update(currentValue => {
  //    return {
  //      ...currentValue,
  //      name: "newName"
  //    }
  // })
  update(callback) {
    const nextValue = callback(super.value);
    super.next(nextValue)
  }

  lift(operator) {
    const result = new SvelteBehaviorSubject()
    result.operator = operator
    result.source = this
    return result
  }
}