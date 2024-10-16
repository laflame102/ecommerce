import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from 'src/pets/pet.entity';

@Module({
  providers: [StudentsService],
  controllers: [StudentsController],
  imports: [TypeOrmModule.forFeature([Pet])],
})
export class StudentsModule {}
