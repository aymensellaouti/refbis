import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TimeStampEntity } from "../../generics/entites/time-stamp.entity";
import { Cv } from "../../cv/entities/cv.entity";

@Entity('user')
export class User extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true
  })
  username: string;
  @Column({
    unique: true
  })
  email: string;
  @Column()
  password: string;
  @OneToMany(
    () => Cv,
    (cv: Cv) => cv.user,
    {}
  )
  cvs: Cv[];
}
