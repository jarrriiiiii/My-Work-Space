////////////////////////////CODE 1////////////////////////////


async GetInventoryData(): Promise<any>{
    const getData = getRepository(Inventory);
    const result =  getData.createQueryBuilder('getData')
    .select(['getData.title', 'getData.price', 'getData.price','getData.description'])

    const data = await result.getMany();
    return { message: commonMessage.get, data: data };

  }
  
  
  
////////////////////////////CODE 2////////////////////////////
  
  
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

  
  ////////////////////////////CODE 3////////////////////////////
  //Code is retrieving data from a database. It is joining with multiple tables (project, projectType, projectSubType, and landArea) to retrieve additional information about each inventory item, including project information, creation dates, and logos.
  
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
 //
