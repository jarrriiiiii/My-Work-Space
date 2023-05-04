import { AdminUserAuth } from "src/admin/admin-user-auth/entities/admin-user-auth.entity"
import { LandArea } from "src/utils/land-area/entities/land-area.entity"
import { ProjectSubType } from "src/utils/project-sub-type/entities/project-sub-type.entity"
import { ProjectType } from "src/utils/project-type/entities/project-type.entity"
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


@Entity()
export class PropertyWalletProduct {
    @PrimaryGeneratedColumn()
    id : number
    
    @Column()
    projectTypeId: number 

    @ManyToOne(()=> ProjectType)
    @JoinColumn({name : 'projectTypeId'})
    projectType : ProjectType

    @Column()
    projectSubTypeId: number 

    @ManyToOne(()=> ProjectSubType)
    @JoinColumn({name : 'projectSubTypeId'})
    projectSubType : ProjectSubType

    @Column({default : false})
    NOC : boolean

    @Column()
    landSize: number 

    @Column()
    landAreaId: number 

    @ManyToOne(()=> LandArea)
    @JoinColumn({name : 'landAreaId'})
    landArea : LandArea

    @Column({nullable : true})
    description : string

    @Column({nullable : true})
    ownerName : string

    @Column({nullable : true})
    ownerPhone : string
    
    @Column({nullable : true})
    ownerEmail : string

    @Column()
    price : number

    @Column({nullable : true})
    cashDealCommissionAmount : string

    @Column({nullable : true})
    InstallmentDealCommissionAmount : string

    @Column()
    minimumPrice : number

    @Column()
    address : string 
    
    @Column()
    city : string 
    
    @Column()
    latitude : string 
    
    @Column()
    longitude : string 

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
    createdByUser : AdminUserAuth

    @Column({nullable : true})
    updatedBy : number

    @ManyToOne(()=> AdminUserAuth)
    @JoinColumn({name : 'updatedBy'})
    updatedByUser : AdminUserAuth
}
