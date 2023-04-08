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
