import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('gender')
export class GenderController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  create(@Body() body: CreateGenderDto) {
    return this.client.send({ cmd: 'create-gender' }, body);
  }

  @Get()
  findAll() {
    return this.client.send({ cmd: 'find_all_genders' }, {});

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'find_one_gender' }, { id });
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send({ cmd: 'remove_gender' }, { id });
  }
}
