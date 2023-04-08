////////////////////////////////////////CODE 1////////////////////////////////////////////////
//The code above is a function named salesQuotation which calculates the total revenue earned from finalized sales. 
//It does this by first creating a query builder for the FinalizeCommision entity
//By selecting the sum of the amount field using the select method of the query builder. 
//Then, it calls the getRawOne method to execute the query and retrieve the result as an object. 
//Finally, it returns a response object with a message and the revenue data.


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


////////////////////////////////////////CODE 2////////////////////////////////////////////////
//This code calculates the sum of:
// 1) Selling Price of all 'SaleQuotation' entities whose status property is 'SOLD' and whose FinalizeSale relation has a status property with value 'APPROVED'.
// 2) Selling prices of 'SaleQuotation' entities that were created in the last 24 hours, and whose status is "SOLD", and whose associated finalizeSale status is "APPROVED".  


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
  
  
  
 
  ////////////////////////////////////////CODE 3////////////////////////////////////////////////
  
  
  async getRevenueWithTrend() {
  try{
      
 //this code is querying the database to get the total selling price of all SaleQuotation records that have been sold and whose finalizeSale records have been approved. The result of the query is stored in the data1 variable.
    const finalise = getRepository(SaleQuotation).createQueryBuilder('final');
    const sum  = finalise.select('SUM(final.sellingPrice)').where("final.status = 'SOLD' ")
    .leftJoin('final.finalizeSale', 'finalizeSale').where("finalizeSale.status = 'APPROVED'")
    const data1 = await sum.getRawOne();
    
   
      
  //this code is querying the database to get the total selling price of all SaleQuotation records that have been sold and whose finalizeSale records have been approved, and that were created within the last 10 days.    
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
  
  
  
  
  


