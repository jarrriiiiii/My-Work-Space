///////////////////////////////////////////////////////////////////////////////////
//get all the data from the db table, fetch all, getMany, retrieve all, get all items, get all records


  async getRoleList():Promise<ResponseDto> {
    try {
      const adminRole = getRepository(AdminRole)
      const Result = adminRole.createQueryBuilder('role')
      const totalItems = await Result.getMany();
      return { message: commonMessage.get, data: totalItems };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  
 /////////////////////////////////////////////////////////////////////////////////////
 //get all the data from the db table, fetch all, getMany, retrieve all, get all items within a given date range, specific date, limited date, time range

  
  async getAllApi(dateDto):Promise<ResponseDto> {
  try {
const start = new Date(dateDto.date);
start.setHours(0, 0, 0, 0);
const end = new Date(start);
end.setDate(start.getDate() + 1);


    const getAll = getRepository(SaveAllPdf)
    const Result = getAll.createQueryBuilder('get')
    .where(`get.createdAt BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`)
    const data = await Result.getMany();
    return { message: commonMessage.get, data: data };


  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}
  }
  
 
/////////////////////////////////////////////////////////////////////////////////////
//get , fetch, getMany, retrieve, get records specific particular selected selective limited data column from the db table
  
async GetInventoryData(): Promise<any>{
    const getData = getRepository(Inventory);
    const result =  getData.createQueryBuilder('getData')
    .select(['getData.title', 'getData.price', 'getData.price','getData.description'])

    const data = await result.getMany();
    return { message: commonMessage.get, data: data };

  }
  
  
/////////////////////////////////////////////////////
 //get , fetch, getMany, retrieve, get records specific particular selected selective limited data column from the db table
  
      async getAllProjects(): Promise<ResponseDto> {
      try {
        const getData = getRepository(PropertyWalletProject);
        const result =  getData.createQueryBuilder('PropertyWalletProject')
        .select(['PropertyWalletProject.projectName','PropertyWalletProject.builderName','PropertyWalletProject.address','PropertyWalletProject.id'])
        const totalItems = await result.getMany();
        return { message: commonMessage.get, data: totalItems };

      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }

  
  ///////////////////////////////////////////////////////
  //get , fetch, getMany, retrieve, get records specific particular selected selective limited data column from the joining with multiple tables db table left join relation table database
  
      async GetInventoryData(): Promise<any>{
    const getData = getRepository(Inventory);
    const result =  getData.createQueryBuilder('getData')


    .select(['getData.title', 'getData.price', 'getData.price','getData.description','x.NOC','y.createdAt', 'z.logo','a.createdAt'])
    .leftJoin('getData.project', 'x')
    .leftJoin('getData.projectType', 'y')
    .leftJoin('getData.projectSubType', 'z')
    .leftJoin('getData.landArea', 'a')
    

    const data = await result.getMany();
    console.log(data)
    return { message: commonMessage.get, data: data };

  }


  ////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
//get count, total number, serial number, number of entries, objects, items in table database db entities entity, getCount

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
//////////////////////////////////////////////////////////////////////////////////////
//get count, total number, serial number, number of entries, objects, items in table database db entities entity, getCount, within the last 24 hours hrs, specific particular time range, limited time span, time interval

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

/////////////////////////////////////////////////////////////////////////////////////
//Code is selecting the count of users who are verified and were created in the last 24 hours.
////get count, total number, serial number, number of entries, objects, items in table database db entities entity, getCount, within the last 24 hours hrs, specific particular time range, limited time span, time interval

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

///////////////////////////////////////////////////////////////////////////////////////
////get count, total number, serial number, number of entries, objects, items in table database db entities entity, getCount, within the last 24 hours hrs, specific particular time range, limited time span, time interval

// It then selects the count of user IDs using user.select(['COUNT(user.id)']). It filters the results by adding a WHERE clause using user.where('user.isVerified = :verify' , {verify : true}), which selects only verified users.



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

//////////////////////////////////////////////////////////////////////////////////
//get count, total number, serial number, number of entries, objects, items in table database db entities entity, getCount, within the last 24 hours hrs, specific particular time range, limited time span, time interval
//The first query counts all users with roles of 'agentManager' or 'agentStaff'. The second query counts all users with roles of 'agentManager' or 'agentStaff' that were created within the last 24 hours. leftJoinAndSelect
  

  async getNoOfRegisteredStaff() {
      try{
        
      const userRepo = getRepository(User)
      const result = await userRepo.createQueryBuilder('u')
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
  

/////////////////////////////////////////////////////////////////////////////////////
////get count, total number, serial number, number of entries, objects, items in table database db entities entity, getCount, within the last 24 hours hrs, specific particular time range, limited time span, time interval, retrieve the total count of units in an inventory, as well as the number of units added in the last 24 hours.

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
