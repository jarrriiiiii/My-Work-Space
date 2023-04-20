///////////////////////////////////////CODE 1////////////////////////////////////////////////
//To get all the data from the db table

  async getPopUpFormData(): Promise<ResponseDto> {
    try {
      const getPopUp = getRepository(PopupForm);
      const result =  getPopUp.createQueryBuilder('pop')
      const data = await result.getMany();
      return { message: commonMessage.get, data: data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


///////////////////////////////////////CODE 2////////////////////////////////////////////////
//To get all the list of admin roles from the db

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

  
  
  
  ///////////////////////////////////////CODE 3////////////////////////////////////////////////
  //To get the list of all tokens saved in the DB
  
    async getToken(): Promise<ResponseDto> {
    try {
      const getToken = getRepository(SignupDeviceToken);
      const result =  getToken.createQueryBuilder('token')

      const data = await result.getMany();

      
      return { message: commonMessage.get, data: data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  
  
  
  ///////////////////////////////////////CODE 4////////////////////////////////////////////////
//This code retrieves all records from the SaveAllPdf table that were created within a given date range.

  
  
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
