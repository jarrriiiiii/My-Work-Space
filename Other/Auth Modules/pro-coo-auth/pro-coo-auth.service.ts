import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from '@nestjs/typeorm';
import { AdminUserAuthService } from 'src/admin/admin-user-auth/admin-user-auth.service';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from 'src/common/aws-ses.service';
import { MobileSms } from 'src/common/mobile-sms.service';
import { PaymentTransactionService } from 'src/payment-transaction/payment-transaction.service';
import { Connection, getRepository } from 'typeorm';
import {
  PcSignInDto,
  PcSignUpDto,
  SuspendCoordinatorDto,
} from './dto/create-pro-coo-auth.dto';
import { ResponseDto } from 'src/common/response.dto';
import { ProjectCoordinatorUser } from './entities/project-coordinator-user.entity';
import { commonMessage } from 'src/common/messages';
import { Crypt } from 'src/common/crypt';
import { ProjectCoordinatorRole } from './entities/project-coordinator-role.entity';
import { PaginationTypeEnum, paginate } from 'nestjs-typeorm-paginate';
import { ProCooVisitLog } from '../pro-coo-visit-logs/entities/pro-coo-visit-log.entity';

@Injectable()
export class ProCooAuthService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,

    private jwtService: JwtService,
    private readonly authService: AuthService,
    // private readonly adminAuth: AdminUserAuthService,
    // private readonly paymentTransactionService: PaymentTransactionService,

    @Inject(forwardRef(() => EmailService))
    private readonly emailService: EmailService,
    private readonly mobileSms: MobileSms,
  ) {}

  async sendMessage(message: string, receiver: string): Promise<boolean> {
    try {
      return await this.mobileSms.sendSms(message, receiver);
    } catch (error) {
      console.log(error);
    }
  }

  async generatePassword(): Promise<string> {
    try {
      const chars = [
        process.env.GENERATE_PASS_1,
        process.env.GENERATE_PASS_2,
        process.env.GENERATE_PASS_3,
      ];
      const randPwd = [5, 3, 2]
        .map(function (len, i) {
          return Array(len)
            .fill(chars[i])
            .map(function (x) {
              return x[Math.floor(Math.random() * x.length)];
            })
            .join('');
        })
        .concat()
        .join('')
        .split('')
        .sort(function () {
          return 0.5 - Math.random();
        })
        .join('');
      return randPwd;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async PcSignUp(pcSignUpDto: PcSignUpDto): Promise<ResponseDto> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      pcSignUpDto.email = pcSignUpDto.email.toLocaleLowerCase();
      const projectCoordinatorUserRepo =
        await queryRunner.manager.getRepository(ProjectCoordinatorUser);

      const pcPhoneCheck = await projectCoordinatorUserRepo.findOne({
        phone: pcSignUpDto.phone,
      });
      const pcEmailCheck = await projectCoordinatorUserRepo.findOne({
        email: pcSignUpDto.email,
      });
      if (pcPhoneCheck) {
        throw new BadRequestException(commonMessage.phoneValidation);
      }
      if (pcEmailCheck) {
        throw new BadRequestException(commonMessage.emailValidation);
      }

      const password = await this.generatePassword();
      const hashPassword = await Crypt.hashString(password);

      const projectCoordinatorUser = await projectCoordinatorUserRepo.save({
        projectCoordinatorRoleId: pcSignUpDto.projectCoordinatorRoleId,
        phone: pcSignUpDto.phone,
        password: hashPassword,
        fullName: pcSignUpDto.fullName,
        email: pcSignUpDto.email,
        whatsappNo: pcSignUpDto.whatsappNo,
        tempPassword: password,
      });

      // await this.sendMessage(
      //   `Dear ${pcSignUpDto.fullName},Thank you for registering your account as Project Coordinator in Property Wallet`,
      //   pcSignUpDto.phone,
      // );

      // await this.emailService.signUpMessageForProjectCoordinator(pcSignUpDto.email,randomCode,pcSignUpDto);

      console.log('Email', pcSignUpDto.email);
      console.log('Password', password);
      await queryRunner.commitTransaction();
      return { message: commonMessage.ProjectCoordinatorRegistered, data: {} };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async PcSignIn(pcSignInDto: PcSignInDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const projectCoordinatorUserRepo = await getRepository(
        ProjectCoordinatorUser,
      );
      const existinguser = await projectCoordinatorUserRepo
        .createQueryBuilder('projectCoordinatorUser')
        .where('projectCoordinatorUser.email = :email', {
          email: pcSignInDto.email,
        })
        .getOne();

      if (!existinguser) {
        throw new BadRequestException('This user email does not exists!');
      }

      const matchpassowrd = await Crypt.compare(
        pcSignInDto.password,
        existinguser.password,
      );

      if (!matchpassowrd) {
        throw new BadRequestException('Invalid Credentials');
      }

      const token = await this.jwtService.sign({
        email: existinguser.email,
        id: existinguser.id,
        isType: 'ProjectCoordinator',
      });

      const projectCoordinator = await projectCoordinatorUserRepo
        .createQueryBuilder('projectCoordinatorUser')
        .select([
          'projectCoordinatorUser.id',
          'projectCoordinatorUser.fullName',
          'projectCoordinatorUser.email',
          'projectCoordinatorUser.phone',
          'projectCoordinatorUser.whatsappNo',
          'projectCoordinatorUser.isActive',
        ])
        .innerJoinAndSelect(
          'projectCoordinatorUser.projectCoordinatorRole',
          'projectCoordinatorRole',
        )
        .where('projectCoordinatorUser.id = :id', { id: existinguser.id })
        .getOne();
      await queryRunner.commitTransaction();

      return {
        message: commonMessage.SignInMessage,
        data: { token: token, exsistingUser: projectCoordinator },
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async getProCooRoleList(): Promise<ResponseDto> {
    try {
      const ProjectCoordinatorRoleRepo = getRepository(ProjectCoordinatorRole);
      const ProjectCoordinatorRoleResult =
        ProjectCoordinatorRoleRepo.createQueryBuilder('projectCoordinatorRole');
      const totalItems = await ProjectCoordinatorRoleResult.getMany();
      return { message: commonMessage.get, data: totalItems };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllCoordinator(page: number, limit: number): Promise<ResponseDto> {
    try {
      const ProjectCoordinatorUserRepo = getRepository(ProjectCoordinatorUser);
      const ProjectCoordinatorUserResult =
        ProjectCoordinatorUserRepo.createQueryBuilder(
          'projectCoordinatorUser',
        ).leftJoinAndSelect(
          'projectCoordinatorUser.projectCoordinatorRole',
          'projectCoordinatorRole',
        );

      const totalItems = await ProjectCoordinatorUserResult.getCount();

      const Data = await paginate<ProjectCoordinatorUser>(
        ProjectCoordinatorUserResult,
        {
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
        },
      );
      return { message: commonMessage.get, data: Data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllAttendant(page: number, limit: number): Promise<ResponseDto> {
    try {
      const ProjectCoordinatorUserRepo = getRepository(ProjectCoordinatorUser);
      const ProjectCoordinatorUserResult =
        ProjectCoordinatorUserRepo.createQueryBuilder('projectCoordinatorUser')
          .select([
            'projectCoordinatorUser.id',
            'projectCoordinatorUser.projectCoordinatorRoleId',
            'projectCoordinatorUser.fullName',
            'projectCoordinatorUser.email',
            'projectCoordinatorUser.phone',
            'projectCoordinatorUser.whatsappNo',
            'projectCoordinatorUser.resetPasswordCode',
            'projectCoordinatorUser.isActive',
            'projectCoordinatorUser.createdAt',
            'projectCoordinatorUser.updatedAt',
            'projectCoordinatorUser.deletedAt',
          ])
          .leftJoin(
            'projectCoordinatorUser.projectCoordinatorRole',
            'projectCoordinatorRole',
          )
          .addSelect([
            'projectCoordinatorRole.id',
            'projectCoordinatorRole.title',
          ])
          .where('projectCoordinatorRole.title = :title', {
            title: 'attendant',
          });

      const totalItems = await ProjectCoordinatorUserResult.getCount();

      const Data = await paginate<ProjectCoordinatorUser>(
        ProjectCoordinatorUserResult,
        {
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
        },
      );
      return { message: commonMessage.get, data: Data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAttendantDetailById(): Promise<ResponseDto> {
    try {
      const getProCooDetails = await this.authService.getProCooDetailsById();

      const ProjectCoordinatorUserRepo = getRepository(ProjectCoordinatorUser);
      const ProjectCoordinatorUserResult =
        await ProjectCoordinatorUserRepo.createQueryBuilder(
          'projectCoordinatorUser',
        )
          .select([
            'projectCoordinatorUser.id',
            'projectCoordinatorUser.projectCoordinatorRoleId',
            'projectCoordinatorUser.fullName',
            'projectCoordinatorUser.email',
            'projectCoordinatorUser.phone',
            'projectCoordinatorUser.whatsappNo',
            'projectCoordinatorUser.resetPasswordCode',
            'projectCoordinatorUser.isActive',
            'projectCoordinatorUser.createdAt',
            'projectCoordinatorUser.updatedAt',
            'projectCoordinatorUser.deletedAt',
          ])
          .leftJoin(
            'projectCoordinatorUser.projectCoordinatorRole',
            'projectCoordinatorRole',
          )
          .addSelect([
            'projectCoordinatorRole.id',
            'projectCoordinatorRole.title',
          ])
          .where('projectCoordinatorRole.title = :title', {
            title: 'attendant',
          })
          .andWhere('projectCoordinatorUser.id = :getProCooDetails', {
            getProCooDetails: getProCooDetails.id,
          });
      const ProjectCoordinatorUserData =
        await ProjectCoordinatorUserResult.getMany();

      const proCooVisitLogRepo = getRepository(ProCooVisitLog);
      const proCooVisitLogResult = await proCooVisitLogRepo
        .createQueryBuilder('proCooVisitLog')
        // .where('proCooVisitLog.projectCoordinatorUserId = :projectCoordinatorUserId', { projectCoordinatorUserId: getProCooDetails.id  })
        .leftJoinAndSelect('proCooVisitLog.agency', 'agency')
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
        .addSelect(['propertyWalletProduct.id', 'propertyWalletProduct.title']);

      const proCooVisitLogData = await proCooVisitLogResult.getMany();
      console.log(proCooVisitLogData);

      return {
        message: commonMessage.get,
        data: {
          ProjectCoordinatorUserData: ProjectCoordinatorUserData,
          proCooVisitLogData: proCooVisitLogData,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async suspendCoordinator(
    id: number,
    suspendCoordinatorDto: SuspendCoordinatorDto,
  ): Promise<ResponseDto> {
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const ProjectCoordinatorUserRepo = getRepository(ProjectCoordinatorUser);

      const findCheck = await ProjectCoordinatorUserRepo.find({ id: id });
      if (findCheck[0]) {
        await ProjectCoordinatorUserRepo.update(id, suspendCoordinatorDto);
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
