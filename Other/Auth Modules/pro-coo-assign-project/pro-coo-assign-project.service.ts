import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ResponseDto } from 'src/common/response.dto';
import { Connection, getRepository } from 'typeorm';
import { ProjectCoordinatorAssignProject } from './entities/pro-coo-assign-project.entity';
import { commonMessage } from 'src/common/messages';
import { PropertyWalletProject } from 'src/admin/property_wallet_project_detail/property_wallet_project/entities/property_wallet_project.entity';
import { PropertyWalletProduct } from 'src/admin/property_wallet_product_detail/property-wallet-product/entities/property-wallet-product.entity';
import { CreateProCooAssignProjectDto } from './dto/create-pro-coo-assign-project.dto';
import { AdminUserAuthService } from 'src/admin/admin-user-auth/admin-user-auth.service';
import { AuthService } from 'src/auth/auth.service';
import { CommonFunction } from 'src/admin/property_wallet_project_detail/property_wallet_project/helpers/helper.service';

@Injectable()
export class ProCooAssignProjectService {
  constructor(
    private readonly connection: Connection,
    private readonly adminAuth: AdminUserAuthService,
    private readonly authService: AuthService,
    private readonly commonFunction: CommonFunction,
  ) {}

  async getProjectsByprojectCoordinatorUserId(
    projectCoordinatorUserId: number,
  ): Promise<ResponseDto> {
    try {
      const projectCoordinatorAssignProjectRepo = getRepository(
        ProjectCoordinatorAssignProject,
      );
      const projectCoordinatorAssignProjectResult =
        await projectCoordinatorAssignProjectRepo
          .createQueryBuilder('projectCoordinatorAssignProject')
          .where(
            'projectCoordinatorAssignProject.projectCoordinatorUserId = :projectCoordinatorUserId',
            { projectCoordinatorUserId },
          )
          .getMany();

      const assignedProjectData = [];
      projectCoordinatorAssignProjectResult.map((x) => {
        assignedProjectData.push(x.propertyWalletProjectId);
      });

      const propertyWalletProjectRepo = getRepository(PropertyWalletProject);
      const propertyWalletProjectResult =
        await propertyWalletProjectRepo.createQueryBuilder(
          'propertyWalletProject',
        );

      if (assignedProjectData.length > 0) {
        propertyWalletProjectResult.andWhere(
          'propertyWalletProject.id NOT IN (:...assignedProjectData)',
          { assignedProjectData: assignedProjectData },
        );
      }

      const result = await propertyWalletProjectResult.getMany();

      return { message: commonMessage.get, data: result };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getProductsByprojectCoordinatorUserId(
    projectCoordinatorUserId: number,
  ): Promise<ResponseDto> {
    try {
      const projectCoordinatorAssignProjectRepo = getRepository(
        ProjectCoordinatorAssignProject,
      );
      const projectCoordinatorAssignProjectResult =
        await projectCoordinatorAssignProjectRepo
          .createQueryBuilder('projectCoordinatorAssignProject')
          .where(
            'projectCoordinatorAssignProject.projectCoordinatorUserId = :projectCoordinatorUserId',
            { projectCoordinatorUserId },
          )
          .getMany();

      const assignedProjectData = [];
      projectCoordinatorAssignProjectResult.map((x) => {
        assignedProjectData.push(x.propertyWalletProjectId);
      });

      const propertyWalletProductRepo = getRepository(PropertyWalletProduct);
      const propertyWalletProductResult =
        await propertyWalletProductRepo.createQueryBuilder(
          'propertyWalletProduct',
        );

      if (assignedProjectData.length > 0) {
        propertyWalletProductResult.andWhere(
          'propertyWalletProject.id NOT IN (:...assignedProjectData)',
          { assignedProjectData: assignedProjectData },
        );
      }

      const result = await propertyWalletProductResult.getMany();

      return { message: commonMessage.get, data: result };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // proCooAssignProject
  async proCooAssignProject(
    createProCooAssignProjectDto: CreateProCooAssignProjectDto,
  ): Promise<ResponseDto> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const projectCoordinatorAssignProjectRepo =
        await queryRunner.manager.getRepository(
          ProjectCoordinatorAssignProject,
        );

      // const alreadyAssignedCheck = await projectCoordinatorAssignProjectRepo
      //   .createQueryBuilder('al')
      //   .where('al.propertyWalletProjectId IN(:...propertyWalletProjectId)', {
      //     propertyWalletProjectId: createProCooAssignProjectDto.propertyWalletProjectId,
      //   })
      //   .andWhere('al.projectCoordinatorUserId = :projectCoordinatorUserId ', {
      //     projectCoordinatorUserId: createProCooAssignProjectDto.projectCoordinatorUserId,
      //   })
      //   .getOne();

      // if (alreadyAssignedCheck)
      //   throw new BadRequestException(
      //     "Already Ass",
      //   );

      // const managers = [];

      for (
        let i = 0;
        i < createProCooAssignProjectDto.propertyWalletProjectId.length;
        i++
      ) {
        await projectCoordinatorAssignProjectRepo.save({
          propertyWalletProjectId:
            createProCooAssignProjectDto.propertyWalletProjectId[i],
          projectCoordinatorUserId:
            createProCooAssignProjectDto.projectCoordinatorUserId,
        });
      }

      await queryRunner.commitTransaction();
      return { message: commonMessage.create, data: null };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}

// async create(
//   createPwLoInventoryDto: CreatePwLoInventoryDto,
// ): Promise<ResponseDto> {
//   const queryRunner = this.connection.createQueryRunner();
//   await queryRunner.connect();
//   await queryRunner.startTransaction();
//   try {
//     const userId = await this.adminAuth.getAdminUserId();
//     const loungeRepo = queryRunner.manager.getRepository(Lounge);
//     const pwLoInventoryRepo =
//       queryRunner.manager.getRepository(PwLoInventory);

//     const checkLounge = await loungeRepo
//       .createQueryBuilder('lg')
//       .where('lg.id IN (:...loungeId)', {
//         loungeId: createPwLoInventoryDto.loungeId,
//       })
//       .getMany();

//     if (checkLounge.length <= 0) {
//       throw new BadRequestException('Invalid loungeId');
//     }
//     const insertData = [];
//     for (let i = 0; i < checkLounge.length; i++) {
//       if (createPwLoInventoryDto.propertyWalletProductId) {
//         insertData.push({
//           propertyWalletProductId:
//             createPwLoInventoryDto.propertyWalletProductId,
//           loungeId: checkLounge[i].id,
//           createdBy: userId,
//         });
//       } else {
//         insertData.push({
//           propertyWalletProjectId:
//             createPwLoInventoryDto.propertyWalletProjectId,
//           loungeId: checkLounge[i].id,
//           createdBy: userId,
//         });
//       }
//     }
//     if (insertData.length > 0) {
//       await pwLoInventoryRepo
//         .createQueryBuilder('pwl')
//         .insert()
//         .values(insertData)
//         .execute();
//     }

//     await queryRunner.commitTransaction();
//     return { message: 'This action adds a new pwLoInventory', data: null };
//   } catch (error) {
//     await queryRunner.rollbackTransaction();
//     throw new InternalServerErrorException(error);
//   } finally {
//     await queryRunner.release();
//   }
// }
