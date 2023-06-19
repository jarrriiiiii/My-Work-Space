@Entity()
export class WebPaymentInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  finalSaleStageId: number


  @Column()
  amount: number

  @Column()
  phoneNo: string

  @Column()
  code: string

  @Column()
  status: string //enum

  @Column()
  url: string

  @Column()
  blinqInvoiceId: number


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
  
  @Column({nullable : true,default : null})
  deletedBy: number;
}
