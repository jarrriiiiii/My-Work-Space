@Injectable()
export class TargetsService {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,

    private readonly fcmPushNotificaionService: FcmPushNotificaionService

  ) {}
  async create(createTargetDto: CreateTargetDto): Promise<ResponseDto> {

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {



//Search userProfileID from Profile entity
      const profRepo = getRepository(Profile);
      const profData = await profRepo.findOne({id : createTargetDto.userProfileId})


//Save stuff in Target table
  const userId = await this.authService.getUserId();

    //Bringing date
    const date = new Date();
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);



      const Repo = queryRunner.manager.getRepository(Target);
      const result = await Repo.save({
        target: createTargetDto.target,
        userProfileId: createTargetDto.userProfileId,
        createdBy: userId,
        endDate: endDate,
      });
       await queryRunner.commitTransaction();
    
   const userInfo = await this.authService.getProfileDetail()


      let notif_message, url;
      
      if(userInfo.role.title != RoleType.agentManager){
        notif_message = `Your team has been assigned sales target by Agency. Click here to view`
        url = '/saleTargetScreen'
      }
      if(userInfo.role.title != RoleType.agentOwner){
        notif_message = `${userInfo.profile.fullName} set your target. Click here to view`
        url =  '/staffTarget'
      }

      const Obj : CreateNotificationDto = {
        userId : profData.userId,
        shortTitle : NotificationTitle.TargetSet,
        notificationType : NotificationType.notification,
        message : notif_message,
        createdBy : userInfo.profile.id,
        url : url,
        refId : 'null',
        imageUrl : 'null'
      }

      await this.notificationService.create(Obj, queryRunner)

      const deviceToken = await this.authService.getDeviceTokens(profData.userId)
          // console.log("deviceToken",deviceToken)
      if(deviceToken.length > 0){
        const fcmObj : FcmDto = {
          deviceToken : deviceToken,
          tag : NotificationTitle.TargetSet,
          body : notif_message,
          title : NotificationType.notification,
          url :  url,
          refId : `null`,
        imageUrl : 'null'
          }
        await this.fcmPushNotificaionService.sendPushNotification(fcmObj)
      }

      return { message: commonMessage.create, data: result };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async AgencyTargets() {
    try {
      const profileDetail = await this.authService.getProfileDetail();
      // console.log(profileDetail)
      // const agencyId = await this.authService.getAgencyId();

      const getManagerAndStaffsListForOwner =
        await this.authService.getManagerStaffsList();
      // console.log("getManagerAndStaffsListForOwner",getManagerAndStaffsListForOwner)
      let teamList = [];
      let teamTarget = 0;
      let teamAch = 0;
      let agencyMember = 0;
      // console.log('agencyMember',agencyMember)

      const setTarget = {
        target: 'Set Target',
        profile: profileDetail.profile,
      };
      const owner = await this.staffTarget(
        profileDetail.profile.agencyId,
        profileDetail.id,
      );
      const ownerDetail = owner ? owner : setTarget;

      // console.log('ownerDetail',ownerDetail)
      for (let x of getManagerAndStaffsListForOwner) {
        // console.log("//////xxxxxxxxxxxxxxxx",x)
        if (x.user.role.title == RoleType.agentStaff) {
          const staffDetail = await this.staffTarget(
            profileDetail.profile.agencyId,
            x.id,
          );
          // console.log("staffDetail", staffDetail)
          const setTarget = {
            target: 'Set Target',
            profile: x,
          };
          teamList.push(staffDetail ? staffDetail : setTarget);
          teamTarget =
            teamTarget +
            (staffDetail?.target ? parseInt(staffDetail?.target) : 0);
            // console.log('teamTarget',teamTarget)
          teamAch =
            teamAch +
            (staffDetail?.achievedTarget
              ? parseInt(staffDetail?.achievedTarget)
              : 0);
              // console.log('teamAch',teamAch )
          agencyMember = agencyMember + 1;
          // console.log('agencyMember',agencyMember)
        }
        if (x.user.role.title == RoleType.agentManager) {
          // console.log("managerProfilee", x, profileDetail.profile.agencyId)
          // console.log("x",x)
          const managerDetail = await this.getStaffTargetsList(
            await this.authService.getProfileDetailByProfileId(x.id),
            profileDetail.profile.agencyId,
          );
          // console.log('managerDetai11',managerDetail)
          // const setTarget = {
          //   target: 'Set Target',
          //   profile: x,
          // };
          // teamList.push((managerDetail?.data) ? managerDetail?.data : setTarget)
          teamList.push(managerDetail?.data.managerDetail);
          teamTarget =
            teamTarget +
            (managerDetail?.data.managerDetail.userProfileId  ||
            managerDetail?.data.managerDetail.teamTarget
              ? (managerDetail?.data.managerDetail.userProfileId ? parseInt(managerDetail?.data.managerDetail.target) :  0)
                + parseInt(managerDetail?.data.managerDetail.teamTarget)
              : 0);
            // console.log('teamTarget1',teamTarget)

          teamAch =
            teamAch +
            (managerDetail?.data.managerDetail.achievedTarget ||
            managerDetail?.data.managerDetail.teamAch
             ? 
             (managerDetail?.data.managerDetail.achievedTarget ? parseInt(managerDetail?.data.managerDetail.achievedTarget) : 0 )
              + parseInt(managerDetail?.data.managerDetail.teamAch)
              : 0);
              // console.log('teamAch1',teamAch )

          agencyMember =
            agencyMember +
            parseInt(managerDetail.data.managerDetail.members) +
            1;
          // console.log('agencyMember',agencyMember)
        }

        // console.log((staffDetail) ? staffDetail : setTarget)
      }
      ownerDetail['teamTarget'] = teamTarget.toString();
      ownerDetail['teamAch'] = teamAch.toString();
      // console.log('agencyMember',agencyMember)

      ownerDetail['agencyMember'] = agencyMember.toString();
      // ownerDetail['teamList'] = teamList
      return { message: commonMessage.get, data: { ownerDetail, teamList } };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async getStaffTargetsList(
    profileDetail,
    agencyId: number,
  ): Promise<ResponseDto> {
    try {
      // console.log("managerProfilee//////////////////////////////////////////////" , profileDetail , agencyId)
      // const userId = await this.authService.getUserId();
      // console.log(userId);

      // console.log("profileDetail", profileDetail);

      const getManagerStaffsList =
        await this.authService.getManagerStaffsListById(profileDetail.user.id);
      // console.log("kjaghsdfjkgsdjk fosidyfhksdjhfksdhk",getManagerStaffsList);
      let staff = [];
      let teamTarget = 0;
      let teamAch = 0;
      const setTarget = {
        target: 'Set Target',
        profile: profileDetail,
      };
      // console.log(setTarget)
      const manager = await this.staffTarget(agencyId, profileDetail.id);
      // console.log('manager' , manager)
      const managerDetail = manager ? manager : setTarget;
      for (let x of getManagerStaffsList) {
        const staffDetail = await this.staffTarget(agencyId, x.id);
        // console.log()
        const setTarget = {
          target: 'Set Target',
          profile: x,
        };
        teamTarget =
          teamTarget +
          (staffDetail?.target ? parseInt(staffDetail?.target) : 0);
        teamAch =
          teamAch +
          (staffDetail?.achievedTarget
            ? parseInt(staffDetail?.achievedTarget)
            : 0);
        staff.push(staffDetail ? staffDetail : setTarget);

        // console.log((staffDetail) ? staffDetail : setTarget)
      }
      managerDetail['teamTarget'] = teamTarget.toString();
      managerDetail['teamAch'] = teamAch.toString();
      managerDetail['members'] = getManagerStaffsList.length.toString();
      managerDetail['staff'] = staff;
      return { message: commonMessage.get, data: { managerDetail } };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async staffTarget(agencyId: number, userProfileId: number) {
    try {
      // console.log(agencyId , userProfileId)
      const targetRepo = getRepository(Target);
      const staffTarget = await targetRepo
        .createQueryBuilder('t')
        .where('t.userProfileId = :userProfileId', { userProfileId })
        .andWhere('t.expire = :expire', { expire: false })
        .leftJoinAndSelect('t.profile', 'profile')
        // .leftJoin('profile.agency','agency')
        .andWhere('profile.agencyId = :agencyId', { agencyId })
        .leftJoin('profile.user', 'user')
        .addSelect(['user.id'])
        .leftJoin('user.role', 'role')
        .addSelect(['role.id', 'role.title'])
        // .leftJoin('t.profile' , 'profile')
        .getOne();
      // console.log(staffTarget)

      return staffTarget;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async staffTargetDetail(): Promise<ResponseDto> {
    try {
      const profileDetail = await this.authService.getProfileDetail();
      const staffDetail = await this.staffTarget(
        profileDetail.profile.agencyId,
        profileDetail.profile.id,
      );
      const setTarget = {
        target: 'Set Target',
        profile: profileDetail,
      };
      return {
        message: commonMessage.get,
        data: staffDetail ? staffDetail : setTarget,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async handleCron() : Promise<ResponseDto> {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        // const userId = await this.authService.getUserId();
        const Repo = queryRunner.manager.getRepository(Target);
        // const Repo = getRepository(Target);
        const targetData = await Repo.createQueryBuilder('target')
          .where('target.expire = false')
          .getMany()
          console.log(targetData)
          for(let x of targetData){
            await Repo.update({id : x.id}, {expire : true})
          }

          const targetData2 = await Repo.createQueryBuilder('target')
          .where('target.expire = false')
          .getMany()
      //   const date = new Date();
      //   const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      // //   const result = await Repo.save({
      // //     target: CreateTargetDto.target,
      // //     userProfileId: createTargetDto.userProfileId,
      // //     createdBy: userId,
      // //     endDate: endDate,
      // //   });
        await queryRunner.commitTransaction();
        return { message: commonMessage.create, data: targetData2 };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException(error);
      } 
      finally {
        await queryRunner.release();
      }      
  }

  async update(id: number, updateTargetDto: UpdateTargetDto): Promise<ResponseDto> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const userInfo = await this.authService.getProfileDetail()
      const Repo = queryRunner.manager.getRepository(Target);
      const find = await Repo.findOne({id : id}) 
      if(!find){
        throw new NotFoundException(`Target "${id}" not found`)
      }
      updateTargetDto.updatedBy = userInfo.id;
      const updatedTarget = await Repo.update({id, expire : false}, {target : updateTargetDto.target})
      await queryRunner.commitTransaction()
      const result = await Repo.createQueryBuilder('t')
      .where('t.id = :Id', {Id : id})
        .leftJoinAndSelect('t.profile', 'profile')
        .leftJoinAndSelect('profile.user', 'user')
        .leftJoinAndSelect('user.role', 'role')
        .getOne()
        let url ;
        if(result.profile.user.role.title == RoleType.agentManager) {
           url = '/saleTargetScreen'
          }
         if(result.profile.user.role.title == RoleType.agentStaff) {
           url ='/staffTarget'
         }
      const Obj : CreateNotificationDto = {
        userId : result.profile.userId,
        shortTitle : NotificationTitle.TargetUpdate,
        notificationType : NotificationType.notification,
        message : `${userInfo.profile.fullName} update your target to ${updateTargetDto.target}`,
        createdBy : userInfo.profile.id,
        url : url,
        refId : 'null',
        imageUrl : 'null'
      }

      await this.notificationService.create(Obj, queryRunner)

      const deviceToken = await this.authService.getDeviceTokens(result.profile.userId)
      // console.log("deviceToken",deviceToken)
      if(deviceToken.length > 0){
        const fcmObj : FcmDto = {
          deviceToken : deviceToken,
          tag : NotificationTitle.TargetUpdate,
          body : `${userInfo.profile.fullName} update your target to ${updateTargetDto.target}`,
          title : NotificationType.notification,
          url : url,
          refId : 'null',
        imageUrl : 'null'
          }
        await this.fcmPushNotificaionService.sendPushNotification(fcmObj)
      }
 

      return { message: commonMessage.update, data :  result} 
    }
    catch (error) {
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException(error)
    }
    finally {
      await queryRunner.release()
    }
  }

  async achievedTarget(userId: number,  achievedAmount :number , queryRunner): Promise<ResponseDto> {
    await queryRunner.startTransaction()
    try {
      const targetRepo = queryRunner.manager.getRepository(Target)
      const finduserTarget = await targetRepo.createQueryBuilder('t')
      .where('t.expire = false')
      .leftJoinAndSelect('t.profile','profile')
      .andWhere('profile.userId = :userId', {userId })
      .leftJoin('profile.user','user')
      .leftJoin('user.role','role')
      .getOne()
      if(finduserTarget?.profile?.userId  && finduserTarget?.profile?.user?.role?.title != RoleType.agentOwner) {
        const amount =((finduserTarget.achievedTarget)? parseInt(finduserTarget.achievedTarget) : 0 ) + achievedAmount
        await targetRepo.update({id : finduserTarget.id}, {achievedTarget : amount.toString()})
      }

      // const Obj : CreateNotificationDto = {
      //   userId : userId,
      //   shortTitle : NotificationTitle.TargetAchieved,
      //   notificationType : NotificationType.notification,
      //   message : `${userInfo.profile.fullName} update your target to ${updateTargetDto.target}`,
      //   createdBy : userInfo.profile.id
      // }

      // await this.notificationService.create(Obj, queryRunner)

      
      await queryRunner.commitTransaction();
      return { message: commonMessage.update, data :  {}} 
    }
    catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
  
}
