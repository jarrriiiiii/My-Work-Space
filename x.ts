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









  ///////////////////////////

  
  async getNoOfRegisteredUser() {
    try{
      const registeredUser = getRepository(User)
      const result = registeredUser.createQueryBuilder('user')
      .select('COUNT(user.id)')
      .leftJoin('user.role', 'role')
      .where('role.title IN :...title)', { title : [RoleType.agentManager , RoleType.agentStaff]})
      
      const data1 = await result.getRawMany();
      const data2 = data1.reduce((acc, curr) => acc + parseInt(curr.total), 0);
  
      const response = {
        totalUsers: data2
      }

      return {message: commonMessage.get , data : response }









      ////////////////////////////