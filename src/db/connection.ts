import { DataSource } from "typeorm";
import { Student } from "../models/Student";
import { Teacher } from "../models/Teacher";
import { Class } from "../models/Class";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_DATABASE || "postgres", // Changed from DB_NAME to DB_DATABASE
  synchronize: true,
  logging: true,
  entities: [Student, Teacher, Class],
  subscribers: [],
  migrations: [],
});