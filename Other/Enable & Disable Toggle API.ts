//Controller
@noModulePermission()
@Patch('/suspendCoordinator/:id')
@UseInterceptors(TransformInterceptor)
suspendCoordinator(@Param('id') id: number, @Body() suspendCoordinatorDto: SuspendCoordinatorDto) {
  return this.proCooAuthService.suspendCoordinator(id, suspendCoordinatorDto);
}

//Service
async suspendCoordinator(id: number, suspendCoordinatorDto: SuspendCoordinatorDto): Promise<ResponseDto> {
  const runner = this.connection.createQueryRunner();
  await runner.connect();
  await runner.startTransaction();
  try {

    const ProjectCoordinatorUserRepo = getRepository(ProjectCoordinatorUser);
    const findCheck = await ProjectCoordinatorUserRepo.find({ id: id });
    if (findCheck[0]) {
      await ProjectCoordinatorUserRepo.update(id, {
        isActive: suspendCoordinatorDto.isActive,
      });
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

//DTO
export class SuspendCoordinatorDto {
@ApiProperty({ default: false })
@IsBoolean()
@IsNotEmpty()
isActive: boolean;
}


//Entity
@Column({ default: true })
isActive: boolean;




