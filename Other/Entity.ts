@Entity()
export class WebPaymentInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  finalSaleStageId: number

  @Column()
  amount: number

  @Column()
  status: string //enum

  @Column()
  url: string

  @Column({default : false})
  isLocked : boolean 

//For Enum
    @Column({
    type: 'enum',
    enum: InventoryType,
  })
  inventoryType: InventoryType;


    @Column({
    type: 'enum',
    enum: ElectricityBackup,
    default: ElectricityBackup.None,
  })
  electricityBackup: ElectricityBackup;
  
  /////////////Default Columns

  @CreateDateColumn({ type: 'timestamp' })
  createdAt : Date
  
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt : Date
  
  @DeleteDateColumn({nullable : true})
  deletedAt : Date
  
  @Column({ nullable: true })
  createdBy: number;
  
  @Column({ nullable: true })
  updatedBy: number;


  //Discouraged highly
  @Column({nullable : true,default : null})
  deletedBy: number;
}
