
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



