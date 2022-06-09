const enum LogMode {
  Error,
  Info,
  Debug,
}

export class Logger {
  public static info(message: string) {
    if (Number(process.env.logMode) ?? 0 >= LogMode.Info) {
      console.log(message);
    }
  }

  public static debug(message: string) {
    if (Number(process.env.logMode) ?? 0 >= LogMode.Debug) {
      console.log(message);
    }
  }

  public static error(message: string) {
    if (Number(process.env.logMode) ?? 0 >= LogMode.Error) {
      console.log(message);
    }
  }
}
