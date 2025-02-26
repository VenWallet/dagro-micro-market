import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'name', nullable: false })
  name!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
