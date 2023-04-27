//Following code are used to update a Profile entity in the database by incrementing the value of the freeToolCount property.


const RepoProfile =  queryRunner.manager.getRepository(Profile);
        if(createSaveAllPdfDto?.userId != null){
        
      
 //The first line retrieves the current state of the Profile entity that matches the userId property in the createSaveAllPdfDto object, and assigns it to the old_count constant variable
          
          const old_count = await RepoProfile.findOne({userId : +createSaveAllPdfDto.userId})
          
//The second line updates the Profile entity by incrementing the value of the freeToolCount property by 1, and then saves the updated entity back to the database.  
          
          await RepoProfile.update({userId : +createSaveAllPdfDto.userId},{freeToolCount : old_count.freeToolCount + 1}) //'freeToolCount' is the element in 'Profile'entity
        
        
        
        }  
