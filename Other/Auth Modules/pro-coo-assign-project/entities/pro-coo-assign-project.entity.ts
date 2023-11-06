import { PropertyWalletProduct } from 'src/admin/property_wallet_product_detail/property-wallet-product/entities/property-wallet-product.entity';
import { PropertyWalletProject } from 'src/admin/property_wallet_project_detail/property_wallet_project/entities/property_wallet_project.entity';
import { ProjectCoordinatorUser } from 'src/project-coordination/pro-coo-auth/entities/project-coordinator-user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProjectCoordinatorAssignProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  propertyWalletProjectId: number;

  @ManyToOne(() => PropertyWalletProject)
  @JoinColumn({ name: 'propertyWalletProjectId' })
  propertyWalletProject: PropertyWalletProject;

  @Column({ nullable: true })
  propertyWalletProductId: number;

  @ManyToOne(() => PropertyWalletProduct)
  @JoinColumn({ name: 'propertyWalletProductId' })
  propertyWalletProduct: PropertyWalletProduct;

  @Column()
  projectCoordinatorUserId: number;

  @ManyToOne(() => ProjectCoordinatorUser)
  @JoinColumn({ name: 'projectCoordinatorUserId' })
  projectCoordinatorUser: ProjectCoordinatorUser;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  //   @Column({ nullable: true })
  //   createdBy: number;

  //   @Column({ nullable: true })
  //   updatedBy: number;
}
