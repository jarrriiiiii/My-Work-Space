///////////////////////////////////////CODE 1////////////////////////////////////////////////
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
