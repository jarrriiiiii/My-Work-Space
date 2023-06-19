///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//This code is checking for different properties in different tables based on the userId retrieved from this.authService.getUserId(). If a property exists for a user in a particular table, then the corresponding property in the obj1 object is set to true if found if not found set to false. object, boolean,

async agencyLogoCheck(){
      try{
     //All the properties are initialized to false. Each property will be set to true if they has been found in the table
        let obj1 = {
          addAgencyLogo: false,
          addInventory: false,
          addStaff: false,
          setComission: false,
          createQuotation: false,
          useFreeTool: false
        };
//To check the different properties with respect to single user
    const userId = await this.authService.getUserId()

// The function does this by querying various tables in the database to see if the user has created any records related to those features.The function first initializes an object with all the properties set to false. Each property represents a feature that the function will check for. Then, it gets the user ID using the getUserId method from the authService.Next, the function queries the Agency table to see if the user has created any records, and if the records have a logo URL. If so, it sets the addAgencyLogo property to true. Similarly, it queries the Inventory table, User table, Commission table, and SaleQuotation table to see if the user has created any records in those tables, and sets the corresponding property to true if records are found.

//Checking from Agency Table
   const agencyRepo = getRepository(Agency);
        const agency = await agencyRepo.createQueryBuilder('agency')
        .where('agency.createdBy = :createdBy', {createdBy : userId})
        .getOne()
         if (agency?.logo_Url) {obj1['addAgencyLogo'] = true}


//Checking from Inventory Table
    const invRepo = getRepository(Inventory);
        const inventory = await invRepo.createQueryBuilder('inv')
        .where('inv.createdBy = :createdBy',{createdBy : userId}).getCount()
        if (inventory) {obj1['addInventory'] = true}


//Checking from User Table
    const AddStaffRepo = getRepository(User);
        const addstaff = await AddStaffRepo.createQueryBuilder('usr')
        .where('usr.createdBy = :createdBy',{createdBy : userId}).getCount()
        if (addstaff) {obj1['addStaff'] = true}
     
//Checking from Comission Table
    const SetCommissionRepo = getRepository(Commission);        
        const setComission = await SetCommissionRepo.createQueryBuilder('com')
        .where('com.createdBy = :createdBy',{createdBy : userId}).getCount()
        if (setComission) {obj1['setComission'] = true}
        
//Checking from SaleQuotation Table
    const createQuotationRepo = getRepository(SaleQuotation);
        const createsaleQuotation = await createQuotationRepo.createQueryBuilder('sale')
        .where('sale.createdBy = :createdBy',{createdBy : userId}).getCount()
         if (createsaleQuotation) {obj1['createQuotation'] = true}

return {msg : obj1}

}catch(error){
throw new InternalServerErrorException(error);
}
}









///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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












///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Retrieve, get date after one month, date function, next month. For example, if the current date is April 28, 2023, then date would represent April 28, 2023 and endDate would represent May 31, 2023 (since the next month after April is May, and May has 31 days).



const date = new Date();
const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      













///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Send sending object combining object as whole as API response, send object as response in API
async propertiesOverview(){
  try{

    //Variable 1
    const inv1 = getRepository(Inventory).createQueryBuilder('inv');
    const getAllInv = await inv1.select(['inv.id']).getCount()

    //Variable 2
    const inv2 = getRepository(Inventory).createQueryBuilder('inv');
    const getAllSold = await inv2.select(['inv.id']).where('inv.noOfUnit = inv.noOfSold').getCount()
   
    //Variable 3
    const NoOfagency = getRepository(Agency).createQueryBuilder('agency');
    const result1 = await NoOfagency.select(['agency.id']).getCount()
        
    //Variable 4
    const TotalsalesQuotation = getRepository(SaleQuotation).createQueryBuilder('final');
    const result2  = TotalsalesQuotation.select('SUM(final.sellingPrice)').where("final.status = 'SOLD' ")
    .leftJoin('final.finalizeSale', 'finalizeSale').where("finalizeSale.status = 'APPROVED'")
    const data = await result2.getRawOne();
    
    //Combing all the variables in the single object
  const response = {
    totalInventory: getAllInv,
    totalSold: getAllSold,
    NoOfagency: result1,
    totalSales: data || 0,
  };
  //Returning the response
  return response;

  }catch(error){
    throw new InternalServerErrorException(error);
  }
}

        
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Following code are used to update a Profile entity in the database by incrementing the value of the freeToolCount property.


const RepoProfile =  queryRunner.manager.getRepository(Profile);
        if(createSaveAllPdfDto?.userId != null){
 //The first line retrieves the current state of the Profile entity that matches the userId property in the createSaveAllPdfDto object, and assigns it to the old_count constant variable
          const old_count = await RepoProfile.findOne({userId : +createSaveAllPdfDto.userId})
          
//The second line updates the Profile entity by incrementing the value of the freeToolCount property by 1, and then saves the updated entity back to the database.  
          await RepoProfile.update({userId : +createSaveAllPdfDto.userId},{freeToolCount : old_count.freeToolCount + 1}) //'freeToolCount' is the element in 'Profile'entity
 }  






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Check if location area exists in the given longitude long and latitude lat, in the given radius, is within radius
//loop iteration on a function, array push pushing, sending array as response, push results in array
  @Get('/isAgencyWithinRadius')
  isAgencyWithinRadius(@Query() isAgencyWithinRadiusDto : IsAgencyWithinRadiusDto) {
    return this.dashboardService.isAgencyWithinRadius(isAgencyWithinRadiusDto);
  }

  async isAgencyWithinRadius(isAgencyWithinRadiusDto : IsAgencyWithinRadiusDto): Promise<any>{

    
  const promotionRepo = getRepository(Agency)
  const result = await promotionRepo.createQueryBuilder('agency')
  .select(['agency.latitude', 'agency.longitude', 'agency.id', 'agency.agencyName', 'agency.logo_Url', 'agency.address', 'agency.NoOfStaffs', 'createdByUser.phone'])
  .leftJoin('agency.createdByUser', 'createdByUser')
  .getMany()

  let locations = []

for (const agency of result) {
 const aa = geolib.isPointWithinRadius(
{ latitude:agency.latitude, longitude: agency.longitude},{ latitude: isAgencyWithinRadiusDto.latitude, longitude: isAgencyWithinRadiusDto.longitude}, +isAgencyWithinRadiusDto.radius);

if(aa){
  let propertyCount = await this.getAgencyPropertyCount(agency.id)
  locations.push({ 
    agencyId: agency.id,
    agencyName: agency.agencyName,
    agencyLogo: agency.logo_Url,
    agencyAddress: agency.address,
    agencyNoOfStaff: agency.NoOfStaffs,
    latitude: agency.latitude,
    longitude: agency.longitude,
    phone: agency.createdByUser.phone,
    propertyCount : propertyCount
  })
}}

return locations
  }
