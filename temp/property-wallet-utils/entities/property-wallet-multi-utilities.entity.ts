
import { AdminUserAuth } from "src/admin/admin-user-auth/entities/admin-user-auth.entity";
import { PropertyWalletInventory } from "src/admin/property_wallet_project_detail/property_wallet_inventory/entities/property_wallet_inventory.entity";
import { Util } from "src/projects/projectFeatureList/utils/entities/util.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
// import { PropertyWalletUtil } from "./property-wallet-util.entity";

@Entity()

export class PropertyWalletMultiUtilities  extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    propertyWalletInventoryId: number;
  
    @ManyToOne(() => PropertyWalletInventory)
    @JoinColumn({ name: 'propertyWalletInventoryId' })
    propertyWalletInventory: PropertyWalletInventory;
    
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
