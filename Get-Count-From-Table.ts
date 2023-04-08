///////////////////////////////////////CODE 1////////////////////////////////////////////////
// This is a function to get the count of all agencies in a database. 

// The function first creates a query builder instance for the Agency entity, and aliases it as agency. 
// It then selects the id column from the agency table and calls the getCount() method on the query builder instance. 
// This method executes the query and returns the total count of all rows in the agency table.
// Finally, the function returns an object with a success message and a data property containing the count of all agencies as AllAgency. 

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



///////////////////////////////////////CODE 2////////////////////////////////////////////////
// This function is retrieving the: 
// Total count of FinalizeSale entities in the database
// Count of FinalizeSale entities that were created within the last 24 hours.

    async getTotalSaleOrder() {
      try{
        const saleOrder = getRepository(FinalizeSale).createQueryBuilder('saleOrder');
        const result = await saleOrder.select(['saleOrder.id']).getCount()
  
        const result2 = await saleOrder.select(['saleOrder.id'])
            .where("saleOrder.createdAt >= NOW() - INTERVAL '24 HOUR'")
            .getCount();
        return {message: commonMessage.get , data : {saleOrder : result, last24hours : result2}}
      }catch(error){
        throw new InternalServerErrorException(error);
      }
    }

///////////////////////////////////////CODE 3////////////////////////////////////////////////
// This is a function to get the count of all agencies created within the last 24 hours. 

// The function first creates a query builder instance for the Agency entity, and aliases it as agency. 
// It then selects the id column from the agency table and uses the where() method to filter the results based on the createdAt column of the Agency entity. 
// The createdAt column is compared to the current date and time minus 24 hours using the NOW() and INTERVAL functions respectively. 
// The getCount() method is called on the query builder instance, which executes the query and returns the count of all rows in the agency table that meet the specified criteria. 
// Finally, the function returns an object with a success message and a data property containing the count of agencies created within the last 24 hours as AllAgency. 


async agenciesLastDayCount() {
    try{
      const NoOfagency = getRepository(Agency).createQueryBuilder('agency');
      const result = await NoOfagency.select(['agency.id']).where("agency.createdAt >= NOW() - INTERVAL '24 HOUR'").getCount()
      
      return {message: commonMessage.get , data : {AllAgency : result}}
    }catch(error){
      throw new InternalServerErrorException(error);
    }
  }

///////////////////////////////////////CODE 4////////////////////////////////////////////////
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

///////////////////////////////////////CODE 5////////////////////////////////////////////////
// This code retrieves the count of verified users in a database using TypeORM, and returns a JSON object containing the count.

// It starts by creating a query builder using getRepository(User).createQueryBuilder('user'), which creates a query builder for the User entity in the database.
// It then selects the count of user IDs using user.select(['COUNT(user.id)']).
// It filters the results by adding a WHERE clause using user.where('user.isVerified = :verify' , {verify : true}), which selects only verified users.
// It executes the query using result.getCount() and assigns the result to the data variable.
// Finally, it returns a JSON object containing the count.


  async getRegisteredUsers():Promise<ResponseDto> {
    try{
      const user = getRepository(User).createQueryBuilder('user')
      const result = user.select(['COUNT(user.id)'])
      .where('user.isVerified = :verify' , {verify : true})
      const data = await result.getCount()

      return {message: commonMessage.get , data : data }

    }catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  
///////////////////////////////////////CODE 6////////////////////////////////////////////////
//This code retrieve the total sum of the 'noOfUnit' column in the 'Inventory' table.

    
  async getNoOfUnits() {
    try{
      const units = getRepository(Inventory).createQueryBuilder('units');
      const getAll = await units.select(['SUM(units.noOfUnit)']) //.getCount()

      const data = await getAll.getRawOne();


      return {message: commonMessage.get , data : {NoOfUnits : data}}
    }catch(error){  
      throw new InternalServerErrorException(error);
    }
  }


///////////////////////////////////////CODE 7////////////////////////////////////////////////

//The first query counts all users with roles of 'agentManager' or 'agentStaff'. 
//The second query counts all users with roles of 'agentManager' or 'agentStaff' that were created within the last 24 hours.

  async getNoOfRegisteredStaff() {
    
    try{
        
      //This line creates a repository for the User entity, which allows us to perform database operations on it.
      const userRepo = getRepository(User)

      // This line creates a new query builder instance and sets the alias for the User entity to u
      const result = await userRepo.createQueryBuilder('u')


      //This select the count of user IDs, which will be returned as the result of the query.
      .select('COUNT(u.id)') 


      //This line performs a left join between the User and Role entities, and sets the alias for the Role entity to role. 
      // This allows us to access the title property of the role later in the query.
      .leftJoinAndSelect('u.role', 'role') 

      //This line filters the query to only include users who have a role title of 'agentManager' or 'agentStaff'
      //The IN operator is used to match the title property against an array of values '[RoleType.agentManager, RoleType.agentStaff]'
      .where('role.title IN (:...title)', { title : [RoleType.agentManager , RoleType.agentStaff]})

      //This line executes the query and returns the count of user IDs that match the filter conditions. 
      .getCount();


      //This is another query to get the count of users created in the last 24 hours who have the roles of agentManager or agentStaff
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
  








///////////////////////////////////////CODE 8////////////////////////////////////////////////
// This function is designed to retrieve the total number of units in an inventory, as well as the number of units added in the last 24 hours.


  async getNoOfUnits() {
    try{
      const units = getRepository(Inventory).createQueryBuilder('units');


      const getAll = await units.select(['SUM(units.noOfUnit)']).getRawOne() //.getCount()
      const getAllLast24Hours = await units.select(['SUM(units.noOfUnit)']).where("units.createdAt >= NOW() - INTERVAL '24 HOUR'").getRawOne() //.getCount()

      return {message: commonMessage.get , data : {NoOfUnits : getAll, NoOfUnit24Hours: getAllLast24Hours}}
    }catch(error){  
      throw new InternalServerErrorException(error);
    }
  }
