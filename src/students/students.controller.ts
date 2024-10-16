import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CacheInterceptor } from '@nestjs/cache-manager';


@UseInterceptors(CacheInterceptor)
@Controller('students')
export class StudentsController {
    constructor(private studentsServices: StudentsService) { }
    
    @Get()
    async getStudents() {
       return await this.studentsServices.getStudents()
    }
}
