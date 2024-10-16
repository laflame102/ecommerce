import { Inject, Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnerService } from 'src/owner/owner.service';
import { Owner } from 'src/owner/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    private ownersService: OwnerService,
  ) {}

  async createPet(createPutInput: CreatePetInput): Promise<Pet> {
    const pet = this.petsRepository.create(createPutInput);

    return this.petsRepository.save(pet);
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  async findOnePet(id: number): Promise<Pet> {
    return this.petsRepository.findOne({ where: { id } });
  }

  async getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }
}
