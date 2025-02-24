import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn("increment")
  student_id!: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  first_name!: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  last_name!: string;

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone!: string;

  @Column({ type: "date", nullable: true })
  birth_date!: Date;

  @Column({ type: "varchar", length: 10, nullable: true })
  gender!: string;

  @Column({ type: "text", nullable: true })
  address!: string;
}