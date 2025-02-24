import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Teacher } from "./Teacher";

@Entity()
export class Class {
  @PrimaryGeneratedColumn("increment")
  class_id!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  class_name!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  subject!: string;

  @Column()
  teacher_id!: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.classes, {
    onDelete: "SET NULL"
  })
  @JoinColumn({ name: "teacher_id" })
  teacher!: Teacher;
}