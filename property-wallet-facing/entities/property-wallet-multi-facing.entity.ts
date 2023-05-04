import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdminUserAuth } from "src/admin/admin-user-auth/entities/admin-user-auth.entity";
// import { PropertyWalletFacing } from "./property-wallet-facing.entity";
import { Facing } from "src/projects/projectFeatureList/facing/entities/facing.entity";
import { PropertyWalletInventory } from "src/admin/property_wallet_project_detail/property_wallet_inventory/entities/property_wallet_inventory.entity";

@Entity()
export class PropertyWalletMultiFacing extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number
    
    @Column()
    propertyWalletInventoryId: number;
  
    @ManyToOne(() => PropertyWalletInventory)
    @JoinColumn({ name: 'propertyWalletInventoryId' })
    propertyWalletInventory: PropertyWalletInventory;
    
    // @Column()
    // propertyWalletFacingId : number

    // @ManyToOne(()=> PropertyWalletFacing)
    // @JoinColumn({name : 'propertyWalletFacingId'})
    // propertyWalletFacing : PropertyWalletFacing


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
