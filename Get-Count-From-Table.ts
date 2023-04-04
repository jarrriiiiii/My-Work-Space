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

  // This is a function to get the count of all agencies in a database. The function first creates a query builder instance for the Agency entity, and aliases it as agency. It then selects the id column from the agency table and calls the getCount() method on the query builder instance. This method executes the query and returns the total count of all rows in the agency table. Finally, the function returns an object with a success message and a data property containing the count of all agencies as AllAgency. If an error occurs during the process, it throws an InternalServerErrorException with the error message.
