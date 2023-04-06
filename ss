async getNoOfRegisteredStaff() {
    try{
      const userRepo = getRepository(User)
      const result = await userRepo.createQueryBuilder('u')
      .select('COUNT(u.id)')
      .leftJoinAndSelect('u.role', 'role')
      .where('role.title IN (:...title)', { title : [RoleType.agentManager , RoleType.agentStaff]})
      .getCount();

      const result1 = await userRepo.createQueryBuilder('u')
      .select('COUNT(u.id)')
      .where("u.createdAt >= NOW() - INTERVAL '24 HOUR'")
      .leftJoinAndSelect('u.role', 'role')
      .andWhere('role.title IN (:...title)', { title : [RoleType.agentManager , RoleType.agentStaff]})
      .getCount();
      return {message: commonMessage.get , data : { userCount: result, last24hourCount : result1} }

    }catch(error){  
      throw new InternalServerErrorException(error);
    }
  }
