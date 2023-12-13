import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import {Department} from "./Department";
import {JoinColumn} from "typeorm";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50
  })
  name: string;

  @JoinColumn({
    name:'d_id'
  })
  @ManyToOne(()=> Department,
    {
      // cascade: true
    })
  department: Department
}
