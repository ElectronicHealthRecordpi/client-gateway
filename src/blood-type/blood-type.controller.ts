import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateBloodTypeDto } from './dto/create-blood-type.dto';
import { UpdateBloodTypeDto } from './dto/update-blood-type.dto';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';

@Controller('blood-type')
export class BloodTypeController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Post()
  create(@Body() createBloodTypeDto: CreateBloodTypeDto) {
    return this.client.send({ cmd: 'create_blood_type' }, createBloodTypeDto);
  }

  // @Get()
  // findAll() {
  //   return this.bloodTypeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bloodTypeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBloodTypeDto: UpdateBloodTypeDto) {
  //   return this.bloodTypeService.update(+id, updateBloodTypeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bloodTypeService.remove(+id);
  // }
}
