import { Logger } from "./logger";

export interface IObservable<T, E = any> {
  next(value: T): void;
  error(err: E): void;
  complete(): void;
}

export interface IObserver<T> {
  update(value: T): void;
}

class Observer<T> implements IObserver<T> {
  private operators: Function[];
  constructor(private callback: Function, operators?: Function[]) {
      this.operators = operators ?? [];
  }
  update(value: T) {
    const valid = this.operators.every((operator) => {
      const isValid = operator(value);
      if(!isValid) {
        Logger.debug(`${operator.name ?? operator.toString()} has declared ${value} as invalid`);
      }
      return isValid;
    });
    valid && this.callback(value);
  }
}

export class Observable<T, E = any> {
  private observers: Observer<T>[] = [];
  private operatorHolder: Function[] = [];
  isComplete = false;
  constructor(subscribe: (subscriber: IObservable<T, E>) => void) {
    subscribe({
      next: this.next,
      complete: this.complete,
      error: this.error,
    });
  }

  private next = (value: T): void => {
    this.observers.forEach((observer) => {
      observer.update(value);
    });
  };

  private error(err: any): void {
    throw new Error("Method not implemented.");
  }

  private complete(): void {
    this.isComplete = true;
    this.observers = [];
  }

  pipe(...operators: Function[]): Observable<T, E> {
    if(operators) {
        this.operatorHolder = operators;
    }
    return this;
  }

  subscribe(
    callbackfn: (value: T) => void,
  ): { unsubscribe: () => void } {
    if (this.isComplete) {
      return { unsubscribe: () => {} };
    }
    const observer = new Observer(callbackfn, this.operatorHolder.length > 0 ? this.operatorHolder : []);
    this.operatorHolder = [];
    this.observers.push(observer);
    return {
      unsubscribe: () => {
        this.observers = this.observers.filter(
          (observerItem) => observer === observerItem
        );
      },
    };
  }
}
