import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  CreateProCooVisitLogDto,
  VisitStatusDto,
} from './dto/create-pro-coo-visit-log.dto';
import { UpdateProCooVisitLogDto } from './dto/update-pro-coo-visit-log.dto';
import { ResponseDto } from 'src/common/response.dto';
import { Connection, getRepository } from 'typeorm';
import { ProCooVisitLog } from './entities/pro-coo-visit-log.entity';
import { commonMessage } from 'src/common/messages';
import { PaginationTypeEnum, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProCooVisitLogsService {
  constructor(private readonly connection: Connection) {}

  async createProCooVisitLog(
    createProCooVisitLogDto: CreateProCooVisitLogDto,
  ): Promise<ResponseDto> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const proCooVisitLogRepo =
        queryRunner.manager.getRepository(ProCooVisitLog);

      const result = await proCooVisitLogRepo.save({
        propertyWalletProjectId:
          createProCooVisitLogDto.propertyWalletProjectId,
        propertyWalletProductId:
          createProCooVisitLogDto.propertyWalletProductId,
        projectCoordinatorUserId:
          createProCooVisitLogDto.projectCoordinatorUserId,
        agencyId: createProCooVisitLogDto.agencyId,
        userId: createProCooVisitLogDto.userId,
        attendantId: createProCooVisitLogDto.attendantId,
        attendantName: createProCooVisitLogDto.attendantName,
        clientName: createProCooVisitLogDto.clientName,
        clientPhone: createProCooVisitLogDto.clientPhone,
        visitDate: createProCooVisitLogDto.visitDate,
        shortDescription: createProCooVisitLogDto.shortDescription,
      });

      await queryRunner.commitTransaction();
      return { message: commonMessage.create, data: result };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async getAllProCooVisitLog(
    page: number,
    limit: number,
  ): Promise<ResponseDto> {
    try {
      const proCooVisitLogRepo = getRepository(ProCooVisitLog);
      const proCooVisitLogResult = proCooVisitLogRepo
        .createQueryBuilder('proCooVisitLog')
        .leftJoin(
          'proCooVisitLog.propertyWalletProject',
          'propertyWalletProject',
        )
        .addSelect([
          'propertyWalletProject.id',
          'propertyWalletProject.projectName',
        ])

        .leftJoin(
          'proCooVisitLog.propertyWalletProduct',
          'propertyWalletProduct',
        )
        .addSelect(['propertyWalletProduct.id', 'propertyWalletProduct.title'])

        .leftJoin('proCooVisitLog.user', 'user')
        .addSelect(['user.id'])

        .leftJoin('user.profile', 'profile')
        .addSelect(['profile.id', 'profile.fullName']);

      const totalItems = await proCooVisitLogResult.getCount();

      const Data = await paginate<ProCooVisitLog>(proCooVisitLogResult, {
        limit,
        page,
        paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
        metaTransformer: ({ currentPage, itemCount, itemsPerPage }) => {
          const totalPages = Math.ceil(totalItems / itemsPerPage);
          return {
            currentPage,
            itemCount,
            itemsPerPage,
            totalPages,
          };
        },
      });
      return { message: commonMessage.get, data: Data };

      return { message: commonMessage.get, data: totalItems };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async editProCooVisitLog(
    id: number,
    updateProCooVisitLogDto: UpdateProCooVisitLogDto,
  ): Promise<ResponseDto> {
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const ProCooVisitLogRepo = runner.manager.getRepository(ProCooVisitLog);

      const findCheck = await ProCooVisitLogRepo.find({ id: id });
      if (findCheck[0]) {
        await ProCooVisitLogRepo.update(id, updateProCooVisitLogDto);
        await runner.commitTransaction();
      }
      return { message: commonMessage.update };
    } catch (err) {
      await runner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    } finally {
      await runner.release();
    }
  }

  async deleteProCooVisitLog(id: number): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const proCooVisitLogRepo =
        queryRunner.manager.getRepository(ProCooVisitLog);

      const findCheck = await proCooVisitLogRepo.findOne({ id });
      if (findCheck.id) {
        await proCooVisitLogRepo.softDelete({ id: id });
      } else {
        throw new BadRequestException(commonMessage.idNotFound);
      }
      await queryRunner.commitTransaction();
      return { message: commonMessage.delete, data: null };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async visitStatus(
    id: number,
    visitStatusDto: VisitStatusDto,
  ): Promise<ResponseDto> {
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const proCooVisitLogRepo = getRepository(ProCooVisitLog);

      const findCheck = await proCooVisitLogRepo.find({ id: id });
      if (findCheck[0]) {
        await proCooVisitLogRepo.update(id, visitStatusDto);
        await runner.commitTransaction();
      }
      return { message: commonMessage.update };
    } catch (err) {
      await runner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    } finally {
      await runner.release();
    }
  }
}
