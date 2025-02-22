import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { FeaturedEntity } from './featured.entity';

@Entity({ name: 'purchases' })
export class PurchaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user', nullable: false })
  user!: string;

  @Column({ name: 'contract', nullable: false })
  contract!: string;

  @Column({ name: 'sales', type: 'int', default: 0 })
  sales!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
