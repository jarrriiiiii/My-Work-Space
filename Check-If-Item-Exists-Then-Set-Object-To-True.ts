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
