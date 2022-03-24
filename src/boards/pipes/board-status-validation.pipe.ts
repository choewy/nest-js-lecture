import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly statusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(
        `${value}는 게시물의 공개여부로 설정할 수 없습니다.`,
      );
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.statusOptions.indexOf(status);
    return index !== -1;
  }
}
