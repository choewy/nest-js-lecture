import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UsersException {
  AlreadyExist = () => {
    throw new ConflictException('이미 존재하는 이메일 계정입니다.');
  };
  NotFound = () => {
    throw new NotFoundException('사용자 정보를 찾을 수 없습니다.');
  };
  WrongEmailOrPassword = () => {
    throw new UnauthorizedException('이메일 또는 비밀번호를 확인하세요.');
  };
  Suspended = () => {
    throw new ForbiddenException('이용 정지 상태이거나 삭제된 계정입니다.');
  };
}
