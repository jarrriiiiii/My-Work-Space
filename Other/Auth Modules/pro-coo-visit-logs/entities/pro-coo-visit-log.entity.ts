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
import { ProjectCoordinatorUser } from 'src/project-coordination/pro-coo-auth/entities/project-coordinator-user.entity';
import { Agency } from 'src/agent/agency/entities/agency.entity';
import { User } from 'src/auth/entities/auth.entity';
import { PropertyWalletProject } from 'src/admin/property_wallet_project_detail/property_wallet_project/entities/property_wallet_project.entity';
import { PropertyWalletProduct } from 'src/admin/property_wallet_product_detail/property-wallet-product/entities/property-wallet-product.entity';
import { IsVisited } from '../dto/create-pro-coo-visit-log.dto';

export class ProCooAuth {}

@Entity()
export class ProCooVisitLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
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

  @Column()
  agencyId: number;

  @ManyToOne(() => Agency)
  @JoinColumn({ name: 'agencyId' })
  agency: Agency;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  attendantId: number;

  @ManyToOne(() => ProjectCoordinatorUser)
  @JoinColumn({ name: 'attendantId' })
  projectCoordinatorUserForAttendant: ProjectCoordinatorUser;

  @Column()
  attendantName: string;

  @Column()
  clientName: string;

  @Column()
  clientPhone: string;

  @Column({ type: 'timestamp' })
  visitDate: Date;

  @Column({ type: 'enum', enum: IsVisited, default: IsVisited.PENDING })
  isVisited: IsVisited;

  @Column({ nullable: true })
  shortDescription: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
