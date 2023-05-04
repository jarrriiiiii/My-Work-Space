import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdminUserAuth } from "src/admin/admin-user-auth/entities/admin-user-auth.entity";
import { Facing } from "src/projects/projectFeatureList/facing/entities/facing.entity";
import { PropertyWalletProduct } from "src/admin/property_wallet_product_detail/property-wallet-product/entities/property-wallet-product.entity";

@Entity()
export class PropertyWalletProductMultiFacing extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number
    
    @Column()
    propertyWalletProductId: number;
  
    @OneToOne(() => PropertyWalletProduct)
    @JoinColumn({ name: 'propertyWalletProductId' })
    propertyWalletProduct: PropertyWalletProduct;


    @Column()
    propertyWalletFacingId : number

    @ManyToOne(()=> Facing)
    @JoinColumn({name : 'propertyWalletFacingId'})
    propertyWalletFacing : Facing

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date 

    @DeleteDateColumn()
    deletedAt : Date
   
    @Column({ nullable: true })
    createdByAdmin: number;
  
    @ManyToOne(() => AdminUserAuth)
    @JoinColumn({ name: 'createdByAdmin' })
    createdByAdminUser: AdminUserAuth;
  
    @Column({ nullable: true })
    updatedByAdmin: number;
  
    @ManyToOne(() => AdminUserAuth)
    @JoinColumn({ name: 'updatedByAdmin' })
    updatedByAdminUser: AdminUserAuth;
}
