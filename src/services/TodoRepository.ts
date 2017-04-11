import * as PouchDB from 'pouchdb-core';

import { ITodoItem } from '../models/ITodoItem';
import { Repository } from 'pouchdb-repository';
import { Service } from 'typedi';

PouchDB.plugin(require('pouchdb-adapter-memory'));

@Service()
export class TodoRepository extends Repository<ITodoItem> {
    constructor() {
        super('todo', {adapter: 'memory'});
    }
}