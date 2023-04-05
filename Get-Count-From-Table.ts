// This is a function to get the count of all agencies in a database. The function first creates a query builder instance for the Agency entity, and aliases it as agency. It then selects the id column from the agency table and calls the getCount() method on the query builder instance. This method executes the query and returns the total count of all rows in the agency table. Finally, the function returns an object with a success message and a data property containing the count of all agencies as AllAgency. If an error occurs during the process, it throws an InternalServerErrorException with the error message.
async allAgenciesCount() {
    try{
      const NoOfagency = getRepository(Agency).createQueryBuilder('agency');
      const result = await NoOfagency.select(['agency.id']).getCount()

      return {message: commonMessage.get , data : {AllAgency : result}}
    }
    catch(error){
        
      throw new InternalServerErrorException(error);
    }
  }

/////////////////////////////////////////////////////////////////////////
    async getSaleOrder() {
      try{
        const saleOrder = getRepository(FinalizeSale).createQueryBuilder('saleOrder');
        const result = await saleOrder.select(['saleOrder.id']).getCount()
  
        return {message: commonMessage.get , data : {saleOrder : result}}
      }catch(error){
        throw new InternalServerErrorException(error);
      }
    }


/////////////////////////////////////////////////////////////////////////
// This is a function to get the count of all agencies created within the last 24 hours. The function first creates a query builder instance for the Agency entity, and aliases it as agency. It then selects the id column from the agency table and uses the where() method to filter the results based on the createdAt column of the Agency entity. The createdAt column is compared to the current date and time minus 24 hours using the NOW() and INTERVAL functions respectively. The getCount() method is called on the query builder instance, which executes the query and returns the count of all rows in the agency table that meet the specified criteria. Finally, the function returns an object with a success message and a data property containing the count of agencies created within the last 24 hours as AllAgency. If an error occurs during the process, it throws an InternalServerErrorException with the error message.
async agenciesLastDayCount() {
    try{
      const NoOfagency = getRepository(Agency).createQueryBuilder('agency');
      const result = await NoOfagency.select(['agency.id']).where("agency.createdAt >= NOW() - INTERVAL '24 HOUR'").getCount()
      
      return {message: commonMessage.get , data : {AllAgency : result}}
    }catch(error){
      throw new InternalServerErrorException(error);
    }
  }

/////////////////////////////////////////////////////////////////////////
// The code you provided is using TypeORM's QueryBuilder to create a query for selecting the count of users who are verified and were created in the last 24 hours.

    async getLastRegisteredUsers() {
    try{
      const user = getRepository(User).createQueryBuilder('user')
      const result = user.select(['COUNT(user.id)'])
     

      .where('user.isVerified = :verify' , {verify : true})
      .where("user.createdAt >= NOW() - INTERVAL '24 HOUR'")
      const data = await result.getCount()
      return {message: commonMessage.get , data : data }

    }catch(error){
      throw new InternalServerErrorException(error);
    }
  }
