import { TodoRepository } from '../../src/services/TodoRepository';
import { expect } from 'chai';

describe('TodoRepository', () => {
    it('should be able to save and load todo', async () => {
        let repo = new TodoRepository();
        await repo.save({
            _id: 'A',
            text: 'AAA'
        });
        await repo.save({
            _id: 'B',
            text: 'BBB'
        });
        await repo.save({
            _id: 'C',
            text: 'CCC'
        });

        let list = await repo.query();

        expect(list.length).equals(3);
    });
});
