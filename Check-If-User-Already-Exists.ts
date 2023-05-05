//checks if a user already exists in the database, table, db by email, phone number, or CNIC. If a user with the given email, phone, or CNIC already exists, the method throws a BadRequestException with the corresponding error message. Email validation, phone validation, CnicValidation, verification, email check, phone check, cnic check, 

  async userCheck (accountVerifyDto :VerifyDto):Promise<ResponseDto> {
    try {
      const userRepo = getRepository(User);
      const emailcheck = await userRepo.findOne({ email: accountVerifyDto.email });
      if (emailcheck) {
        throw new BadRequestException(commonMessage.emailValidation);
      }
      const phonecheck = await userRepo.findOne({ phone: accountVerifyDto.phone });
      if (phonecheck) {
        throw new BadRequestException(commonMessage.phoneValidation);
      }
      const cniccheck = await userRepo.findOne({ email: accountVerifyDto.cnic });
      if (cniccheck) {
        throw new BadRequestException(commonMessage.emailValidation);
      }
      return { message : commonMessage.create, data :{}}
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
