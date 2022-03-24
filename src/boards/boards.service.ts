import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  // Inject Repository to Service
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(
        `{id: ${id}}에 해당하는 게시물을 찾을 수 없습니다.`,
      );
    }
    return found;
  }

  //   private boards: Board[] = [
  //     {
  //       id: '0aa62910-aa50-11ec-ac11-4bbf39811cac',
  //       title: '테스트 입니다.',
  //       description: '테스트의 내용입니다.',
  //       status: BoardStatus.PUBLIC,
  //     },
  //   ];
  //   getAllBoards(): Board[] {
  //     return this.boards;
  //   }
  //   getBoardById(id: string): Board {
  //     const found = this.boards.find((board) => board.id === id);
  //     if (!found) {
  //       throw new NotFoundException('존재하지 않는 게시물입니다.');
  //     }
  //     return found;
  //   }
  //   deleteBoardById(id: string): void {
  //     const found = this.getBoardById(id);
  //     this.boards = this.boards.filter((board) => board.id !== found.id);
  //   }
  //   createBoard(createBoardDto: CreateBoardDto) {
  //     const { title, description } = createBoardDto;
  //     const board: Board = {
  //       id: uuid(),
  //       title,
  //       description,
  //       status: BoardStatus.PUBLIC,
  //     };
  //     this.boards.push(board);
  //     return board;
  //   }
  //   updateBoardStatusById(id: string, status: BoardStatus): Board {
  //     const board = this.getBoardById(id);
  //     board.status = status;
  //     return board;
  //   }
}
