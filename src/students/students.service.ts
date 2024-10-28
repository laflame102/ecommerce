import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Pet } from 'src/pets/pet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
  ) {}

  async getStudents() {
    const cachedData = await this.cacheManager.get('students');
    if (cachedData) {
      console.log('Found cached data');
      return cachedData;
    }

    const studentsData = await this.petRepository.find();
    await this.cacheManager.set('students', studentsData);
    return studentsData;
  }
}
