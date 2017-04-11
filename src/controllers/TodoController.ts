import { Body, Delete, Get, JsonController, Param, Post, UndefinedResultCode } from 'routing-controllers';

import { ITodoItem } from '../models/ITodoItem';
import { Inject } from 'typedi';
import { TodoRepository } from '../services/TodoRepository';

@JsonController('/todo')
export class TodoController {
    @Inject()
    repo: TodoRepository;

    @Get()
    getItems() {
        return this.repo.query();
    }

    @Post()
    async saveItem( @Body() item: ITodoItem) {
        if (!item._id) {
            item._id = Date.now().toString();
        }
        await this.repo.save(item);
        return item;
    }

    @Delete('/:id')
    @UndefinedResultCode(204)    
    async deleteItem( @Param('id') id: string) {
        let item = await this.repo.get(id);
        await this.repo.remove(item);
    }

}