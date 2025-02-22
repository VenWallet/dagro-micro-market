import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { IndexEnum } from '../enums/index.enum';

@Entity({ name: 'featured' })
export class FeaturedEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user', nullable: true })
  user!: string;

  @Column({ name: 'contract', nullable: false })
  contract!: string;

  @Column({ name: 'clicks', type: 'int', default: 0 })
  clicks!: number;

  @Column({ name: 'views', type: 'int', default: 0 })
  views!: number;

  @Column({ name: 'is_highlighted', type: 'boolean', default: false })
  isHighlighted!: boolean;

  @Column({ name: 'last_interacted_at', type: 'timestamp', nullable: true })
  lastInteractedAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
