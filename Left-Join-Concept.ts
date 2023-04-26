///////////////////////////////////////CODE 1////////////////////////////////////////////////
//This query calculates the total sum of selling prices of all the sale quotations that have been sold and approved for finalization.

  async salesQuotation() {
  try{
    const finalise = getRepository(SaleQuotation).createQueryBuilder('final');
    const result  = finalise.select('SUM(final.sellingPrice)').where("final.status = 'SOLD' ")
    .leftJoin('final.finalizeSale', 'finalizeSale').where("finalizeSale.status = 'APPROVED'")
    const data = await result.getRawOne();
    return {message: commonMessage.get , data : {Revenue :  data}}
    }
    
  catch(error){
      throw new InternalServerErrorException(error);
    }
  }

//--------------------------------------------------------------------------------------
// The SaleQuotation entity has the following columns:

// id (primary key, auto-generated)
// inventoryId (foreign key referencing Inventory)
// dealType (string)
// quotationNo (string)
// sellingPrice (number)
// clientName (string)
// phone (string)
// plotNumber (string, nullable)
// discount (string)
// status (string, default value 'OPEN')
// validity (string, nullable)
// isExpire (boolean, default value false)
// createdAt (timestamp, auto-generated)
// updatedAt (timestamp, auto-generated)
// deletedAt (timestamp, nullable, used for soft deletion)
// createdBy (foreign key referencing User)
// updatedBy (foreign key referencing User, nullable)
// The SaleQuotation entity has the following relationships:

// Many-to-One relationship with Inventory
// Many-to-One relationship with User
// One-to-Many relationship with PaymentPlan
// One-to-Many relationship with FinalizeSale



//////Code

@Entity()
export class SaleQuotation extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    inventoryId: number 

    @ManyToOne(()=> Inventory)
    @JoinColumn({name : 'inventoryId'})
    inventory : Inventory

    @Column()
    dealType : string 

    @Column()
    quotationNo : string 

    @Column()
    sellingPrice : number 

    @Column()
    clientName : string 

    @Column()
    phone : string

    @Column({nullable : true})
    plotNumber : string

    @Column()
    discount : string

    @Column({default : 'OPEN'})
    status : string

    @Column({nullable : true})
    validity : string
    
    @Column({default : false})
    isExpire : boolean

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @DeleteDateColumn()
    deletedAt : Date

    @Column()
    createdBy : number

    @ManyToOne(()=> User)
    @JoinColumn({name : 'createdBy'})
    createdByUser : User

    @Column({nullable : true})
    updatedBy : number

    @ManyToOne(()=> User)
    @JoinColumn({name : 'updatedBy'})
    updatedByUser : User

    @OneToMany(() => PaymentPLan, paymentPLan => paymentPLan.saleQuotation)
    paymentPLan!: PaymentPLan[];

    @OneToMany(() => FinalizeSale, finalizeSale => finalizeSale.saleQuotation)
    finalizeSale: FinalizeSale[];


//--------------------------------------------------------------------------------------

// The FinalizeSale entity has the following columns:

// id (primary key, auto-generated)
// saleQuotationId (foreign key referencing SaleQuotation)
// cnic (string)
// cnicFront (string)
// cnicBack (string)
// invoiceNo (string)
// status (string, default value 'PENDING')
// createdAt (timestamp, auto-generated)
// updatedAt (timestamp, auto-generated)
// deletedAt (timestamp, nullable, used for soft deletion)
// createdBy (foreign key referencing User)
// updatedBy (foreign key referencing User, nullable)
// The FinalizeSale entity has the following relationships:

// One-to-One relationship with SaleQuotation
// Many-to-One relationship with User
// One-to-One relationship with FinalizeCommission




///////Code
@Entity()
export class FinalizeSale extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    saleQuotationId: number 

    @OneToOne(()=> SaleQuotation)
    @JoinColumn({name : 'saleQuotationId'})
    saleQuotation : SaleQuotation

    @Column()
    cnic : string 

    @Column()
    cnicFront : string 

    @Column()
    cnicBack : string 

    @Column()
    invoiceNo : string 

    @Column({default : 'PENDING'})
    status : string

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @DeleteDateColumn()
    deletedAt : Date

    @Column()
    createdBy : number

    @ManyToOne(()=> User)
    @JoinColumn({name : 'createdBy'})
    createdByUser : User

    @Column({nullable : true})
    updatedBy : number

    @ManyToOne(()=> User)
    @JoinColumn({name : 'updatedBy'})
    updatedByUser : User


    @OneToOne(() => FinalizeCommision, finalizeCommision => finalizeCommision.finalizeSale)
    finalizeCommision: FinalizeCommision;

}
