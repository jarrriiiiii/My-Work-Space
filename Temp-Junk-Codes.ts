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



////////////////////////
  async GetInventoryData(): Promise<any>{
    const getData = getRepository(Inventory);
    const result =  getData.createQueryBuilder('getData')
    .select(['getData.title', 'getData.price', 'getData.price','getData.description'])

    const data = await result.getMany();
    return { message: commonMessage.get, data: data };

  }

////////////////////////

