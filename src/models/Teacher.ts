import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Class } from "./Class";
@Entity()
export class Teacher {
  @PrimaryGeneratedColumn("increment")
  teacher_id!: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  first_name!: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  last_name!: string;

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone!: string;

  @OneToMany(() => Class, (classEntity) => classEntity.teacher)
  classes!: Class[];
}