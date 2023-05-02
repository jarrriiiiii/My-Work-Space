import { AdminUserAuth } from "src/admin/admin-user-auth/entities/admin-user-auth.entity"
import { LandArea } from "src/utils/land-area/entities/land-area.entity"
import { ProjectSubType } from "src/utils/project-sub-type/entities/project-sub-type.entity"
import { ProjectType } from "src/utils/project-type/entities/project-type.entity"
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { PropertyWalletProject } from "../../property_wallet_project/entities/property_wallet_project.entity"

@Entity()
export class PropertyWalletInventory {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    propertyWalletProjectId: number 

    // @Column({nullable : true})
    // title : string 

    @ManyToOne(()=> PropertyWalletProject)
    @JoinColumn({name : 'propertyWalletProjectId'})
    propertyWalletProject : PropertyWalletProject

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

    @Column()
    price : number

    @Column({nullable : true})
    cashDealCommissionAmount : string

    @Column({nullable : true})
    cashDealCommissionPer : string

    @Column({nullable : true})
    InstallmentDealCommissionAmount : string

    @Column({nullable : true})
    InstallmentDealCommissionPer : string

    @Column()
    minimumPrice : number

    // @Column()
    // noOfUnit : number 

    // @Column({default : 0})
    // noOfSold : number 

    

    // @Column({nullable : true})
    // advanceAmount : string

    // @Column({nullable : true})
    // monthlyInstallment : string

    // @Column({nullable : true})
    // noOfInstallMentRemaining : string

   

    // @Column({nullable : true})
    // bedRooms : number

    // @Column({nullable : true})
    // washRooms : number

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

    // @OneToMany(() => Commission, commission => commission.inventory)
    // commission!: Commission[];

    // @OneToMany(() => BusinessAndCommunication, businessAndCommunication => businessAndCommunication.inventory)
    // businessAndCommunication!: BusinessAndCommunication[];

    // @OneToMany(() => Feature, feature => feature.inventory)
    // feature!: Feature[];

    // @OneToMany(() => HealthcareRecreational, healthcareRecreational => healthcareRecreational.inventory)
    // healthcareRecreational!: HealthcareRecreational[];

    // @OneToMany(() => NearbyLocationsAndOtherFacility, nearbyLocationsAndOtherFacility => nearbyLocationsAndOtherFacility.inventory)
    // nearbyLocationsAndOtherFacility!: NearbyLocationsAndOtherFacility[];

    // @OneToMany(() => OtherFacility, otherFacility => otherFacility.inventory)
    // otherFacility!: OtherFacility[];

    // @OneToMany(() => PlotFeature, plotFeature => plotFeature.inventory)
    // plotFeature!: PlotFeature[];

    // @OneToMany(() => Room, room => room.inventory)
    // room!: Room[];

    // @OneToMany(() => MultiFace, multiFace => multiFace.inventory)
    // multiFace!: MultiFace[];

    // @OneToMany(() => Utilities, utilities => utilities.inventory)
    // utilities!: Utilities[];

    // @OneToMany(() => ViewInventory, viewInventory => viewInventory.inventory)
    // viewInventory: ViewInventory[];

    // @OneToMany(() => FavoriteInventory, favoriteInventory => favoriteInventory.inventory)
    // favoriteInventory: FavoriteInventory[];
     
    // @OneToMany(() => SaleQuotation, saleQuotation => saleQuotation.inventory)
    // saleQuotation: SaleQuotation[];
}
