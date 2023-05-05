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

