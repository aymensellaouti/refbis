import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { SkillService } from "../skill/skill.service";
import { Skill } from "../skill/entities/skill.entity";
import {
   randEmail,
   randFirstName,
   randJobTitle,
   randJobType,
   randLastName,
   randNumber, randPassword,
   randUserName
} from "@ngneat/falso";
import { CvService } from "../cv/cv.service";
import { Cv } from "../cv/entities/cv.entity";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";

async function bootstrap() {  const app = await NestFactory.createApplicationContext(AppModule);
   console.log('Seed de notre base de données');
   // Todo Seed des Skills
   const skillService = app.get(SkillService);
   const skills: Skill[] = [];
   for (let i=0 ; i < 10; i++) {
      const skill = new Skill();
      skill.designation = randJobType();
      skills[i] = await skillService.create(skill);
   }

   // Todo Seed des Users
   const userService = app.get(UserService);
   const users: User[] = [];
   for (let i=0 ; i < 10; i++) {
      const user = new User();
      user.email = randEmail();
      user.username = randUserName();
      user.password = randPassword();
      users[i] = await userService.create(user);
   }
   // Todo Seed des Cvs
   const cvService = app.get(CvService);
   const cvs: Cv[] = [];
   for (let i=0 ; i < 10; i++) {
      const cv = new Cv();
      cv.name = randFirstName() + ' ' + randLastName();
      cv.age = randNumber({min:18, max:65});
      cv.job = randJobTitle();
      cv.skills = [];
      for (let j = 0; j < 3 ; j++) {
         cv.skills[j] = skills[j];
      }
      cv.user = users[i];
      cvs[i] = await cvService.create(cv);
   }
   await app.close();
}
bootstrap();
