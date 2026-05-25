import { Controller, Get, Query, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config/services';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import {
    EpidemiologyDateRangeDto,
    EpidemiologyHeatmapDto,
    EpidemiologyIncidenceDto,
    EpidemiologyTrendsDto,
    EpidemiologyClustersDto,
    EpidemiologyOutbreakDto,
} from './dto/epidemiology-query.dto';

@UseGuards(AuthGuard, RoleGuard)
@Roles('ADMIN', 'DOCTOR')
@Controller('epidemiology')
export class EpidemiologyController {
    constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

    // GET /api/epidemiology/summary
    @Get('summary')
    getSummary(@Query() query: EpidemiologyDateRangeDto) {
        return this.client
            .send({ cmd: 'epidemiology.get-summary' }, query)
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // GET /api/epidemiology/outbreak-predictions
    @Get('outbreak-predictions')
    predictOutbreak(@Query() query: EpidemiologyOutbreakDto) {
        return this.client
            .send({ cmd: 'epidemiology.predict-outbreak' }, query)
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // GET /api/epidemiology/heatmap
    @Get('heatmap')
    getHeatmap(@Query() query: EpidemiologyHeatmapDto) {
        return this.client
            .send({ cmd: 'epidemiology.get-heatmap' }, query)
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // GET /api/epidemiology/incidence
    @Get('incidence')
    getIncidence(@Query() query: EpidemiologyIncidenceDto) {
        return this.client
            .send({ cmd: 'epidemiology.get-incidence-stats' }, query)
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // GET /api/epidemiology/trends
    @Get('trends')
    getTrends(@Query() query: EpidemiologyTrendsDto) {
        return this.client
            .send({ cmd: 'epidemiology.get-trends' }, query)
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // GET /api/epidemiology/clusters
    @Get('clusters')
    getClusters(@Query() query: EpidemiologyClustersDto) {
        return this.client
            .send({ cmd: 'epidemiology.get-clusters' }, query)
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }
}
