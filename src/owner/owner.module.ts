import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerResolver } from './owner.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';

@Module({
  providers: [OwnerResolver, OwnerService],
  imports: [TypeOrmModule.forFeature([Owner])],
  exports: [OwnerService],
})
export class OwnerModule {}
