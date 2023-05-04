import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {PropertyWalletProject} from './property_wallet_project.entity'
import { AdminUserAuth } from "src/admin/admin-user-auth/entities/admin-user-auth.entity";

@Entity()
export class PropertyWalletProjectDocument {
    @PrimaryGeneratedColumn()
    id : number
    
    @Column()
    propertyWalletProjectId: number

    @JoinColumn({ name: "propertyWalletProjectId" })
    @ManyToOne(() => PropertyWalletProject)
    propertyWalletProject: PropertyWalletProject

    @Column()
    doc : string 

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @DeleteDateColumn({nullable: true})
    deletedAt : Date

    @Column()
    createdBy: number

    @Column({nullable: true})
    deletedBy: number
    
    @Column({nullable: true})
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