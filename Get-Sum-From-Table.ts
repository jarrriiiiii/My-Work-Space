////////////////////////////////////////CODE 1////////////////////////////////////////////////

// The code above is a function named salesQuotation which calculates the total revenue earned from finalized sales. It does this by first creating a query builder for the FinalizeCommision entity and selecting the sum of the amount field using the select method of the query builder. Then, it calls the getRawOne method to execute the query and retrieve the result as an object. Finally, it returns a response object with a message and the revenue data.
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



  
