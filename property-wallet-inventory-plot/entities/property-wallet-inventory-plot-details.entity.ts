import { AdminUserAuth } from "src/admin/admin-user-auth/entities/admin-user-auth.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PropertyWalletInventoryPlotDetails {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    title : string
    
    @Column()
    value : string
    
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
