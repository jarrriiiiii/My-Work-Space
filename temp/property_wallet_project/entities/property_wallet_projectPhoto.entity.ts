import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,  } from "typeorm";
import {PropertyWalletProject} from './property_wallet_project.entity'
import { AdminUserAuth } from "src/admin/admin-user-auth/entities/admin-user-auth.entity";

@Entity()
export class PropertyWalletProjectPhoto {
    @PrimaryGeneratedColumn()
    id : number
    
    @Column()
    propertyWalletProjectId: number

    @JoinColumn({ name: "propertyWalletProjectId" })
    @ManyToOne(() => PropertyWalletProject)
    propertyWalletProject: PropertyWalletProject

    @Column()
    photo : string 

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @DeleteDateColumn()
    deletedAt : Date

    @Column()
    createdBy: number

    @Column()
    deletedBy: number
    
    @Column()
    updatedBy: number

    @JoinColumn({name : 'createdBy'})
    @ManyToOne(()=> AdminUserAuth)
    createdByAdmin:AdminUserAuth
    
    @JoinColumn({name : 'deletedBy'})
    @ManyToOne(()=> AdminUserAuth)
    deletedByAdmin:AdminUserAuth
    
    @JoinColumn({name : 'updatedBy'})
    @ManyToOne(()=> AdminUserAuth)
    updatedByAdmin:AdminUserAuth
}