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

  


///////////////////////////////////////////////////////////////////////////////////
//get all the data from the db table, fetch all, getMany, retrieve all, get all items, get all records by id

    @Get('getAllPWProduct/:id')
@hasModulePermission(moduleType.inventories)
getAllPWProduct(@Param('id') id: number) {
    return this.propertyWalletProductService.getAllPWProduct(+id);
}

  async getAllPWProduct(id : number) : Promise<ResponseDto>{
    try {
      const PWProductRepo = getRepository(PropertyWalletProduct)
      const PWProductResult = PWProductRepo.createQueryBuilder('PropertyWalletProduct')
      .where('PropertyWalletProduct.id = :id', {id})
      const totalItems = await PWProductResult.getMany();
      console.log(totalItems)
      return { message: commonMessage.get, data: totalItems };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
    
    
    
 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //get all the data from the db table, fetch all, getMany, retrieve all, get all items within a given date range, specific date, limited date, time range


@Controller('pdfs')
export class PdfsController {
  @Get()
  async getPdfsByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);

    const getAll = getRepository(SaveAllPdf);
    const result = await getAll
      .createQueryBuilder('get')
      .where('user.deletedAt is null')
      .andWhere(`get.createdAt BETWEEN :startDate AND :endDate`, {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      })
      .getMany();

    return result;
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//get by id , fetch by id, getMany, retrieve, get records specific particular selected selective limited data column from the db table database
    
    
    async getProductDetail (id : number){
  try {
    const productRepo = getRepository(
      PropertyWalletProduct
    );
    const data = await productRepo.createQueryBuilder('p')
    .where('p.id = :id', {id})
    .leftJoinAndSelect('p.projectType','projectType')
    .leftJoinAndSelect('p.ProjectSubType','ProjectSubType')
    .getOne()
    return data

  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}
 
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//get by id , fetch by id, getMany, retrieve, get records specific particular selected selective limited data column from the db table database
//matching match compare comparing lists array for same items, send true for matching, send false for not match matching
//left join, relation
 
    async getUtil(propertyWalletInventoryId :number): Promise<ResponseDto> {
      try {
        const PWMURepo = getRepository(PropertyWalletMultiUtilities);
        const utilRepo = getRepository(Util); 
        const utilResult = await utilRepo.createQueryBuilder('util')
        .getMany()

        const PWMUResult = PWMURepo.createQueryBuilder('PropertyWalletMultiUtilities')
        .select([
          'PropertyWalletMultiUtilities.id',
          'PropertyWalletMultiUtilities.propertyWalletInventoryId',
          'PropertyWalletMultiUtilities.propertyWalletUtilId',
          'propertyWalletUtil.id',
          'propertyWalletUtil.title',
        ])
        .where('PropertyWalletMultiUtilities.propertyWalletInventoryId = :propertyWalletInventoryId',{propertyWalletInventoryId})
        .leftJoin('PropertyWalletMultiUtilities.propertyWalletUtil','propertyWalletUtil')
        const data = await PWMUResult.getMany();

        for(let x of utilResult){
          x['abc'] = false
          for(let y of data){
            if(x.id == y.id) {
              x['abc'] = true
            }
          }
        }
        return {
          message: commonMessage.get,
          data: utilResult,
        };
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
}
 
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //get , fetch, getMany, retrieve, get records specific particular selected selective limited data column from the joining with multiple tables db table left join relation table database
  //get by id using pagination, paginate,
 
  @Get('/getAvailableInventoriesByProjectId/:ProjectId')
  getAvailableInventoriesByProjectId(@Param('ProjectId') ProjectId: string, @Query('page', ParseIntPipe) page: number,
  @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.propertyWalletInventoryPlotService.getAvailableInventoriesByProjectId(+ProjectId, page, limit);
  }

   
    async getAvailableInventoriesByProjectId(ProjectId: number, page: number, limit: number): Promise<ResponseDto> {
  try {
    const convoRepo = getRepository(PropertyWalletProject);
    const convoList = await convoRepo
    .createQueryBuilder('con')
    .select([
      'con.id', //main repo table
      'con.city', //main repo table
      'propertyWalletInventory.price', //1st joined table
      'propertyWalletInventory.landSize', //1st joined table
      'landArea.id', //2nd joined table
      'landArea.title' //2nd joined table
    
    ])
    .where('con.id =:projectId', {projectId: ProjectId})
    .leftJoin('con.propertyWalletInventory', 'propertyWalletInventory') //joining this table from the main repo table
    .leftJoin('propertyWalletInventory.landArea','landArea') //joining this from the ABOVE JOINED table


    const totalItems = await convoList.getCount();
    const Data = await paginate<PropertyWalletProject>(convoList, {
      limit,
      page,
      paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
      metaTransformer: ({ currentPage, itemCount, itemsPerPage }) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        return {
          currentPage,
          itemCount,
          itemsPerPage,
          totalPages,
          
        }
      }
    })

    return { message: commonMessage.get, data: Data };

  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//get , fetch, getMany, retrieve, get records from multiple many tables db table entity entities, get by id , fetch by id, getMany, retrieve
//import importing multiple many more than one repo repository repositories tables db table entity entities
//passing output result data in the object as response
    
    
  @Get('getInventoryDetailStep2/:propertyWalletInventoryId')
  @hasModulePermission(moduleType.inventories)
  getInventoryDetailStep2(@Param('propertyWalletInventoryId') propertyWalletInventoryId: number) {
      return this.propertyWalletInventoryService.getInventoryDetailStep2(+propertyWalletInventoryId);
  }

    
    async getInventoryDetailStep2(propertyWalletInventoryId : number):Promise<ResponseDto> {
      try {
        const premiumFeatureRepo = getRepository(PropertyWalletFeature)
        const buisnessAndCommRepo = getRepository(PropertyWalletBusinessAndCommunication)


        const premiumFeatureData = await premiumFeatureRepo.createQueryBuilder('pwf')
          .where('pwf.propertyWalletInventoryId = :propertyWalletInventoryId', { propertyWalletInventoryId })
          .getOne();
        
        const buisnessAndCommData = await buisnessAndCommRepo.createQueryBuilder('bc')
          .where('bc.propertyWalletInventoryId = :propertyWalletInventoryId', { propertyWalletInventoryId })
          .getOne();
        
     

        
        let data = new Object();
        data['premiumFeatures'] = premiumFeatureData ? premiumFeatureData : null;
        data['buisnessAndCommunication'] = buisnessAndCommData ? buisnessAndCommData : null;
        data['utilities'] = propertyWalletMultiUtilitiesData ? propertyWalletMultiUtilitiesData : null;

        return { message: commonMessage.get, data: data };
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//get , fetch, getMany, retrieve, get records specific particular selected selective limited data column from the db table if condition matches, bind data in object, by loop
//passing output result data, binding data in the object as response if condition matches, conditional result
//loop, binding data

 @Get('/isAgencyWithinRadius')
  isAgencyWithinRadius(@Query() isAgencyWithinRadiusDto : IsAgencyWithinRadiusDto) {
    return this.dashboardService.isAgencyWithinRadius(isAgencyWithinRadiusDto);
  }


async isAgencyWithinRadius(
  isAgencyWithinRadiusDto : IsAgencyWithinRadiusDto,
): Promise<any> {

  const promotionRepo = getRepository(Agency)
  const result = await promotionRepo.createQueryBuilder('agency')
  .select(['agency.latitude', 'agency.longitude', 'agency.id', 'agency.agencyName'])
  .getMany()

  let locations = []

for (const agency of result) {
 const aa = geolib.isPointWithinRadius(
{ latitude:agency.latitude, longitude: agency.longitude },{ latitude: isAgencyWithinRadiusDto.latitude, longitude: isAgencyWithinRadiusDto.longitude }, +isAgencyWithinRadiusDto.radius);

if(aa){
  locations.push({ agencyId: agency.id, agencyName: agency.agencyName, latitude:agency.latitude, longitude: agency.longitude,  })
}}
return locations
}  
    

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
//get , fetch, getMany, retrieve, get records, latest time, from today, from today date from the table db table table database
//order by descending order, sort by latest date time, sort by status, 
    
  @Get('getCurrentHotList')
  @hasModulePermission(moduleType.hotListing)
  @UseInterceptors(TransformInterceptor)
  getCurrentHotList() {
    return this.propertyWalletHotListingService.getCurrentHotList();
  }
     
  async getCurrentHotList(): Promise <ResponseDto> {

    try{
      const PWHotListingRepo = getRepository(PropertyWalletHotListing)

      // const timestamp: Date = new Date();
      // const isoString: string = timestamp.toISOString();
      // const today: string = isoString.replace("Z", "+00:00");
      // console.log(`createdAt: ${today}`);


      const today = new Date().toISOString().split('T')[0]
      console.log(today)
      
      const Result  = PWHotListingRepo.createQueryBuilder('hot')
      .where("hot.status = :status AND DATE(hot.createdAt) <= :today", { status: 'OPEN', today })
      .orderBy('hot.createdAt', 'DESC')
      const Data = await Result.getMany()
       console.log(Data)

      return { message: commonMessage.get , data : Data}

    }catch(err){
      throw new InternalServerErrorException(err)
    }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //get ,getOne, fetch, retrieve, get records specific particular selected selective limited data column from multiple DB table database
    //more than one, multiple table db, database, bind data in to object, bind multiple table db database data into one single object

  @forAllUser()
  @Get('getPropertyWalletProductFinalizeSaleById/:id')
  getPropertyWalletProductFinalizeSaleById(@Param('id') id: string) {
    return this.propertyWalletProductFinalizeSaleService.getPropertyWalletProductFinalizeSaleById(+id);
  }

  async getPropertyWalletProductFinalizeSaleById(id: number): Promise<ResponseDto> {
    try {
      const productFinalizeSaleRepo = getRepository(PropertyWalletProductFinalizeSale)
      const productFinalizeSaleStageRepo = getRepository(PropertyWalletProductFinalizeSaleStage)
      const userId = await this.authService.getUserId()

      const data = await productFinalizeSaleRepo.createQueryBuilder('fs')
        .select([
          'fs.id', 'fs.createdAt', 'fs.totalAmount', 'fs.status', 'sq.id', 'sq.dealType', 'sq.clientName', 'sq.phone',
          'pwp.title', 'pwp.ownerName', 'pwp.ownerPhone'
        ])
        .leftJoin('fs.propertyWalletProductSaleQuotation', 'sq')
        .leftJoin('sq.propertyWalletProduct', 'pwp')
        .where('fs.createdBy = :createdBy', { createdBy: userId })
        .andWhere('fs.id = :id', { id })
        .getOne()

      const sumPaidStages = await productFinalizeSaleRepo.createQueryBuilder('fs')
        .select('SUM(fss.amount)', 'paidAmount')
        .leftJoin('fs.propertyWalletProductFinalizeSaleStage', 'fss')
        .where('fs.createdBy = :createdBy', { createdBy: userId })
        .andWhere('fs.id = :id', { id })
        .andWhere('fss.status = :status', { status: payment.PAID })
        .getRawOne()
      data['paidAmount'] = sumPaidStages?.paidAmount ? sumPaidStages?.paidAmount : '0'
      return { message: commonMessage.get, data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
    
    
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      @forAllUser() 
  @Get('getAllFinalisedSaleForProject')
  getAllFinalisedSaleForProject( @Query('page', ParseIntPipe) page: number, @Query('limit', ParseIntPipe) limit: number) {
    return this.propertyWalletInventoryFinalizeSaleService.getAllFinalisedSaleForProject(page, limit);
  }



  async getAllFinalisedSaleForProject(page: number, limit: number): Promise<any>{

    const userId = await this.adminAuth.getAdminUserId();
    
    const getData = getRepository(PropertyWalletInventoryFinalizeSale);
    const result =  getData.createQueryBuilder('PropertyWalletInventoryFinalizeSale')
    .where('PropertyWalletInventoryFinalizeSale.createdBy = :createdBy', {createdBy : userId})

    const totalItems = await result.getCount();
    const Data = await paginate<PropertyWalletInventoryFinalizeSale>(result, {
      limit,
      page,
      paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
      metaTransformer: ({ currentPage, itemCount, itemsPerPage }) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        return {
          currentPage,
          itemCount,
          itemsPerPage,
          totalPages,
        }
      }
    })
    return { message: commonMessage.get, data: Data };
  }
    
    
    
    
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    
    
  
  
  
  
  
  
  
  
  
    
  
  
  
  
  
  
  
  
    
    
    
    
    
    
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
    
/////////////////////////////////////////////////////////////////////////////////////
//get count, total number, serial number, number of entries, objects, items in table database db entities entity, getCount by Project Inventory ID
    
      async getInventoryCountByProjectId(propertyWalletProjectId : number) {
    try {
    const inventoryRepo = getRepository(PropertyWalletInventory);
    const data = await inventoryRepo.createQueryBuilder('inv')
    .select('COUNT(inv.id)')
    .where('inv.propertyWalletProjectId = :propertyWalletProjectId',{propertyWalletProjectId})
    .getRawOne()
    return {message : commonMessage.get , data : data}
    } catch (error) {
      
    }
  }
    
   
/////////////////////////////////////////////////////////////////////////////////////
//get count, total number, serial number, number of entries, objects, items in table database db entities entity, getCount by ID
  async getAgencyPropertyCount (agencyId : number) {
  try {
    
const PropertyWalletInventoryRepo = await getRepository(Project)
const propertyCount =  await PropertyWalletInventoryRepo.createQueryBuilder('Project')
.leftJoin('Project.createdByUser', 'createdByUser')
.leftJoin('createdByUser.profile', 'profile')
.where('profile.agencyId = :agencyId', {agencyId :agencyId })
.getCount()

return propertyCount
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
 }
    
    
    
    
    
    
    
    
    
    
    
    
    






    
    
    





    
    
    
    
    
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Calculate sum, add, addition, total amount, total added, total sum of items, records, objects, entities, in database table db, calculates the total revenue earned from finalized sales


async salesQuotation() {
    try{
    const finalise = getRepository(FinalizeCommision).createQueryBuilder('final');
    const result  = finalise.select('SUM(final.amount)')
    const data = await result.getRawOne();
    return {message: commonMessage.get , data : {Revenue :  data}}
    }
    
  catch(error){
      throw new InternalServerErrorException(error);
    }
  }
///////////////////////////////////////////////////////////////////////////////////////
//Calculate sum, add, addition, total amount, total added, total sum of items, objects, entities, in database table db, Selling Price of all 'SaleQuotation' entities whose status property is 'SOLD' and whose FinalizeSale relation has a status property with value 'APPROVED'. Total calculated sum addition of Selling prices created in the last 24 hours, and whose status is "SOLD", and whose associated finalizeSale status is "APPROVED".  


  async revenueGenerate():Promise<ResponseDto> {
    try {
      const finalise = getRepository(SaleQuotation)

//This code retrieves sum of sellingPrice of all SaleQuotation entities whose status property is 'SOLD' and whose FinalizeSale relation has a status property with value 'APPROVED'.
      const result = finalise.createQueryBuilder('final')
      //adds a SELECT clause to the query builder, which calculates the sum of sellingPrice of all SaleQuotation entities.
        .select('SUM(final.sellingPrice)') 
      //adds a WHERE clause to the query builder, which filters the SaleQuotation entities to only include those that have a status property with value 'SOLD'.
        .where("final.status = 'SOLD' ")
      //performs a left join with the finalizeSale property of the SaleQuotation entity, which is a OneToOne relation to the FinalizeSale entity.
        .leftJoin('final.finalizeSale', 'finalizeSale')
      //adds another filter to the query builder to only include SaleQuotation entities whose FinalizeSale relation has a status property with value 'APPROVED'.
        .andWhere("finalizeSale.status = 'APPROVED'")
      const data = await result.getRawOne();


//This code retrieves the sum of the selling prices of SaleQuotation entities that were created in the last 24 hours, and whose status is "SOLD", and whose associated finalizeSale status is "APPROVED".
      const result2 = finalise.createQueryBuilder('final')
      .select('SUM(final.sellingPrice)')
      .where("final.createdAt >= NOW() - INTERVAL '24 HOUR'")
      .andWhere("final.status = 'SOLD' ")
      .leftJoin('final.finalizeSale', 'finalizeSale')
      .andWhere("finalizeSale.status = 'APPROVED'")
     const data2 = await result2.getCount();

      return { message: commonMessage.get, data: { Revenue: data ,last24Hours :data2} };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  
  //////////////////////////////////////////////////////////////////////////////////
  //Calculate sum, add, addition, total amount, total added, total sum of items, objects, entities, in database table db, get the total selling price of all SaleQuotation records that have been sold and whose finalizeSale records have been approved, calculating and storing the revenue and trend values based on the data retrieved from the previous queries, allowing for further analysis or visualization of the data. 
  
  async getRevenueWithTrend() {
  try{

    const finalise = getRepository(SaleQuotation).createQueryBuilder('final');
    const sum  = finalise.select('SUM(final.sellingPrice)').where("final.status = 'SOLD' ")
    .leftJoin('final.finalizeSale', 'finalizeSale').where("finalizeSale.status = 'APPROVED'")
    const data1 = await sum.getRawOne();
    
    
    const average  = finalise.select('SUM(final.sellingPrice)').where("final.status = 'SOLD' ").andWhere("final.createdAt >= NOW() - INTERVAL '10 DAY' ")
    .leftJoin('final.finalizeSale', 'finalize').where("finalize.status = 'APPROVED'")
    const data2 = await average.getRawOne();
    
//this code is calculating and storing the revenue and trend values based on the data retrieved from the previous queries, allowing for further analysis or visualization of the data.      
   const average1=(data2['avg']/data1['sum'])*100;
  
      
      const result = {
      revenue:data1['sum'],
      trend:average1
    }
   
    return {message: commonMessage.get , data: result}
    }
  catch(error){
      throw new InternalServerErrorException(error);
    }
  }

    


































 //////////////////////////////////////////////////////////////////////////////////
//Generate excel file, get excel, get xlsx, get data from table db entity database, export to excel, get excel file, download
    
      @Get('generateExcel')
  async downloadExcel(@Res() res: Response): Promise<void> {
    return this.propertyWalletInventoryPlotService.generateExcel(res)
  }
  
    
  async getExcelData(): Promise<ResponseDto> {
  try {

    const getPopUp = getRepository(PropertyWalletInventoryPlot);
    const result =  getPopUp.createQueryBuilder('PropertyWalletInventoryPlot')
    // .leftJoinAndSelect('PropertyWalletInventoryPlot.assignPlotDetails', 'PropertyWalletInventoryAssignPlotDetail')
    const data = await result.getMany();
    return { message: commonMessage.get, data: data };
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}


async generateExcel(@Res() res: Response): Promise<void> {
  try {
    const getdataa = await this.getExcelData();
    const wb = xlsx.utils.book_new();

    const sheet1Data = xlsx.utils.json_to_sheet(getdataa.data);
    xlsx.utils.book_append_sheet(wb, sheet1Data, 'Sheet 1');


    const name = 'excel_file';
    const sheetDataBuffer = xlsx.write(wb, {
      bookType: 'xlsx',
      type: 'buffer',
      bookSST: false,
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + name + '.xlsx');
    res.send(sheetDataBuffer);
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}
  



