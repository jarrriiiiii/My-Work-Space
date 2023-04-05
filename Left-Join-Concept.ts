///////////////////////////////////////CODE 1////////////////////////////////////////////////
// This is an asynchronous function named salesQuotation. It uses the async keyword to indicate that it returns a promise and may contain asynchronous code. The try block contains the main logic of the function, which involves creating a query using the TypeORM library to retrieve data from the SaleQuotation table. The getRepository method is used to obtain a repository for the SaleQuotation entity, which allows you to construct queries using a query builder. The createQueryBuilder method is called on the repository object to create a new query builder instance with the alias final. The select method is then called on the query builder to select the sum of the sellingPrice column from the SaleQuotation table where the status column equals 'SOLD'. A LEFT JOIN is added to the query using the leftJoin method on the query builder, specifying the finalizeSale table as the right table in the join and adding a condition to only include rows where the status column in the finalizeSale table equals 'APPROVED'. Finally, the getRawOne method is called on the query builder to execute the query and return the first result as a raw object. The function then returns an object with a message property set to the value of commonMessage.get and a data property containing another object with a Revenue property set to the value of the sum of the selling prices from the executed query. If any error occurs during the execution of the function, a InternalServerErrorException is thrown with the error message as its argument.

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




//////Code
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
