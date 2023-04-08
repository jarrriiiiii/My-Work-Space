



////////////////////////
  async GetInventoryData(): Promise<any>{
    const getData = getRepository(Inventory);
    const result =  getData.createQueryBuilder('getData')
    .select(['getData.title', 'getData.price', 'getData.price','getData.description'])

    const data = await result.getMany();
    return { message: commonMessage.get, data: data };

  }

////////////////////////
  
  
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


  
  
  
  //////////////
  
  

  async GetInventoryData(): Promise<any>{
    const getData = getRepository(Inventory);
    const result =  getData.createQueryBuilder('getData')


 
    .select(['getData.title', 'getData.price','getData.description','getData.description','xproject','xprojectType','profile.fullName','agency.agencyName','agency.description' ])
    .leftJoin('getData.project', 'xproject')
    .addSelect([
      'xproject.id',
      'xproject.projectName',
    ])
    .leftJoin('getData.projectType', 'xprojectType')

    .addSelect(['xprojectType.id','xprojectType.title'])
    .leftJoin('getData.createdByUser', 'createdByUser')
    .addSelect(['createdByUser.id',
    'createdByUser.email',
    // 'createdByUser.',
  ])
    .leftJoinAndSelect('createdByUser.profile', 'profile')
    .leftJoinAndSelect('profile.agency', 'agency')

    

    const data = await result.getMany();
    console.log(data)
    return { message: commonMessage.get, data: data };

  }
