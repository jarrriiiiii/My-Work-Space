import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PropertyWalletProjectPhoto } from "./property_wallet_projectPhoto.entity";
import {PropertyWalletProjectDocument} from './property_wallet_projectDocument.entity'
import { AdminUserAuth } from "src/admin/admin-user-auth/entities/admin-user-auth.entity";
import { PropertyWalletInventory } from "../../property_wallet_inventory/entities/property_wallet_inventory.entity";


@Entity()
export class PropertyWalletProject  {
    @PrimaryGeneratedColumn()
    id : number

    @Column({nullable : true})
    projectName : string
    
    @Column({default : true})
    NOC : boolean
    
    @Column({nullable : true})
    description : string 
    
    @Column({nullable : true})
    address : string

    @Column({nullable : true})
    city : string 

    @Column({nullable : true})
    latitude : string
    
    @Column({nullable : true})
    longitude : string   
    
    @Column({nullable : true})
    masterPlan : string
    
    @Column({nullable : true})
    builderName : string
    
    @Column({nullable : true})
    phoneNo : string
    
    @Column({nullable : true})
    websiteLink : string

    @Column({nullable : true})
    BuilderLogo : string
    
    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @DeleteDateColumn()
    deletedAt : Date

    @Column()
    createdBy : number

    @ManyToOne(()=> AdminUserAuth)
    @JoinColumn({name : 'createdBy'})
    createdByAdmin : AdminUserAuth

    @Column({nullable : true})
    updatedBy : number

    @ManyToOne(()=> AdminUserAuth)
    @JoinColumn({name : 'updatedBy'})
    updatedByAdmin : AdminUserAuth

    @OneToMany(() => PropertyWalletProjectPhoto, propertyWalletProjectPhoto => propertyWalletProjectPhoto.propertyWalletProject)
    propertyWalletProjectPhoto: PropertyWalletProjectPhoto[];
    
    @OneToMany(() => PropertyWalletProjectDocument, propertyWalletProjectDocument => propertyWalletProjectDocument.propertyWalletProject)
    propertyWalletProjectDocument: PropertyWalletProjectDocument[];

    @OneToMany(() => PropertyWalletInventory, propertyWalletInventory => propertyWalletInventory.propertyWalletProject)
    propertyWalletInventory: PropertyWalletInventory[];

}
