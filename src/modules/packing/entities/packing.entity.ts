import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'packing' })
export class PackingEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'name', nullable: false })
  name!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
