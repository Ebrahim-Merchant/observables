import { Logger } from "./classes/logger";
import { Observable } from "./classes/Observable";

const START = 1000;

const observer = new Observable<number | undefined>((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);

  setTimeout(() => subscriber.next(4), START * 1);
  setTimeout(() => subscriber.next(5), START * 2);
  setTimeout(() => subscriber.next(6), START * 3);
  setTimeout(() => subscriber.next(undefined), START * 4);
  setTimeout(() => subscriber.next(7), START * 5);
  setTimeout(() => subscriber.next(10), START * 6);
});

const subscriberOne = observer
  .pipe(
      (value: number | undefined) => !!value,
      (value: number) => value > 100
  )
  .subscribe((value) => {
    Logger.info(`subscriberOne: ---${value}---`);
  });

const subscriberTwo = observer.subscribe((value) => {
  Logger.info(`subscriberTwo: ---${value}---`);
});

setTimeout(() => {
  subscriberOne.unsubscribe();
  Logger.info(`subscriberOne unsubscribed, num of observers: ${(observer as any).observers.length}`);
}, START * 7);

setTimeout(() => {
  subscriberTwo.unsubscribe();
  Logger.info(`subscriberTwo unsubscribed, num of observers: ${(observer as any).observers.length}`);
}, START * 9);
