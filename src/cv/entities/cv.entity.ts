import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { TimeStampEntity } from "../../generics/entites/time-stamp.entity";
import { User } from "../../user/entities/user.entity";
import { Skill } from "../../skill/entities/skill.entity";


@Entity('cv')
export class Cv extends TimeStampEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({
    type: 'smallint'
  })
  age: number;
  @Column()
  job: string;
  @Column()
  path: string;
  @ManyToOne(
    type => User,
    (user: User) => user.cvs,
    {}
  )
  user: User;
  @ManyToMany(() => Skill, null, {
    // cascade: ['insert']
  })
  @JoinTable({
    name: 'cv_skill',
    joinColumn: {
      name: 'cv',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'skill',
      referencedColumnName: 'id'
    }
  })
  skills: Skill[];
}
