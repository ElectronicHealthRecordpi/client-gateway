import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateBloodTypeDto } from './dto/create-blood-type.dto';
import { UpdateBloodTypeDto } from './dto/update-blood-type.dto';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('blood-type')
export class BloodTypeController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Post()
  create(@Body() body: CreateBloodTypeDto) {
    return this.client.send({ cmd: 'create-blood-type' }, body);
  }

  @Get()
  findAll() {
    return this.client.send({ cmd: 'find-all-blood-types' }, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'find-one-blood-type' }, { id });

  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateBloodTypeDto) {
    // return this.bloodTypeService.update(+id, updateBloodTypeDto);
    console.log({ id, ...body });
    return this.client.send({ cmd: 'update-blood-type' }, { id: Number(id), ...body });
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bloodTypeService.remove(+id);
  // }
}
