import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PropertyWalletInventory } from "../../property_wallet_inventory/entities/property_wallet_inventory.entity";
import { IsEnum } from "class-validator";
import { AdminUserAuth } from "src/admin/admin-user-auth/entities/admin-user-auth.entity";

export enum Type{
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
}
@Entity()
export class PropertyWalletInventoryPlot {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    propertyWalletInventoryId: number;

    @ManyToOne(() => PropertyWalletInventory)
    @JoinColumn({ name: 'propertyWalletInventoryId' })
    propertyWalletInventory: PropertyWalletInventory;

    @Column()
    @IsEnum([Type.CLOSE,Type.OPEN])
    plotType : string

    @Column()
    plotNo : string

    @CreateDateColumn()
    createdAt:  Date

    @UpdateDateColumn({nullable : true})
    updatedAt : Date 

    @DeleteDateColumn({nullable : true})
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
