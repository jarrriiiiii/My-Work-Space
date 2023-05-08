import { AdminUserAuth } from "src/admin/admin-user-auth/entities/admin-user-auth.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PropertyWalletInventoryPlot } from "./property-wallet-inventory-plot.entity";
import { PropertyWalletInventoryPlotDetails } from "./property-wallet-inventory-plot-details.entity";

@Entity()
export class PropertyWalletInventoryAssignPlotDetail {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    PropertyWalletInventoryPlotId: number;

    @ManyToOne(() => PropertyWalletInventoryPlot)
    @JoinColumn({ name: 'PropertyWalletInventoryPlotId' })
    propertyWalletInventoryPlot: PropertyWalletInventoryPlotDetails;


    @Column()
    PropertyWalletInventoryPlotDetails: number;

    @ManyToMany(() => PropertyWalletInventoryPlotDetails)
    @JoinColumn({ name: 'PropertyWalletInventoryPlotDetails' })
    propertyWalletInventoryPlotDetails: PropertyWalletInventoryPlotDetails;

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
