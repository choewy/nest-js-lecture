import { ConsoleLogger } from '@nestjs/common';

export class LoggerService extends ConsoleLogger {
  log(message: any, stack?: string, context?: string) {
    super.log.apply(this, [message, stack, context]);
    console.log('---------------');
    this.doSomething();
  }
  private doSomething() {
    // 여기에 로깅에 관련된 부가 로직을 추가합니다.
    // ex. DB에 저장
  }
}
