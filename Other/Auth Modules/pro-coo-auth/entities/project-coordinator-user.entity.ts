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
import { ProjectCoordinatorRole } from './project-coordinator-role.entity';

export class ProCooAuth {}

@Entity()
export class ProjectCoordinatorUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectCoordinatorRoleId: number;

  @ManyToOne(() => ProjectCoordinatorRole)
  @JoinColumn({ name: 'projectCoordinatorRoleId' })
  projectCoordinatorRole: ProjectCoordinatorRole;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  whatsappNo: string;

  @Column()
  password: string;

  @Column()
  tempPassword: string;

  @Column({ nullable: true })
  resetPasswordCode: string;

  @Column({ default: true })
  isActive: boolean;

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
