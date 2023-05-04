
import { AdminUserAuth } from "src/admin/admin-user-auth/entities/admin-user-auth.entity";
import { PropertyWalletProduct } from "src/admin/property_wallet_product_detail/property-wallet-product/entities/property-wallet-product.entity";
import { Util } from "src/projects/projectFeatureList/utils/entities/util.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()

export class PropertyWalletProductMultiUtilities  extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    propertyWalletProductId: number;
  
    @OneToOne(() => PropertyWalletProduct)
    @JoinColumn({ name: 'propertyWalletProductId' })
    propertyWalletProduct: PropertyWalletProduct;
    
    @Column({nullable : true})
    propertyWalletUtilId : number

    @ManyToOne(()=> Util)
    @JoinColumn({name : 'propertyWalletUtilId'})
    propertyWalletUtil : Util

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


    // @ManyToMany(() => Util, util => util.id)
    // utils: Util[];


}
