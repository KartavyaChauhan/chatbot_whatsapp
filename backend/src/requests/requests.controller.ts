import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';

@Controller('api/requests')
export class RequestsController {
    constructor(private readonly requestsService: RequestsService){}

    @Post()
    async create(@Body() createRequestDto: CreateRequestDto){
        try {
            return await this.requestsService.create(createRequestDto);

        }catch (error) {
            throw new HttpException('Failed to save request', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Get()
    async findAll() {
        try {
            return await this.requestsService.findAll();
        } catch (error) {
            throw new HttpException('Failed to retrieve requests', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
