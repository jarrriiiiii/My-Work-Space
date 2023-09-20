/////////////////Method 1/////////////////

for (let x of createHotlistingDto.createHotListingSubDto) {
    const result = await HotListingRepo.save({
      agencyId: getProfileData.profile.agencyId,
      inventoryId: x.inventoryId,
      PwSubPackageId: assignPackageData.pwSubPackageId,
      saleCommission: x?.saleCommission ? x?.saleCommission : 0,
      isNegotiate: x?.isNegotiate ? x?.isNegotiate : false,
      createdBy: getProfileData.id,
    });
  }

/////////////////Method 2/////////////////

const investorArr = new Array();
for (let i = 0; i < assignInvestorDto.investors.length; i++) {
  investorArr.push({
    userId: assignInvestorDto.userId,
    investorId: assignInvestorDto.investors[i].investerId,
    percentage: assignInvestorDto.investors[i].percentage,
    createdBy: userId,
  });
}

const paymentStages = await investorUserRepo
  .createQueryBuilder('ps')
  .insert()
  .values(investorArr)
  .execute();
