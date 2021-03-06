import { BooksStore, TestBook, TestBooksState } from './booksStore.test';
import { runStoreAction, StoreActions } from '../src/runStoreAction';
import { createMockEntities } from './mocks';

describe('runStoreAction', () => {
  it('should run store actions', () => {
    const store = new BooksStore();

    runStoreAction<TestBook>('books', StoreActions.SetEntities, { payload: { data: createMockEntities() } });
    expect(store._value().ids.length).toBe(2);

    runStoreAction<TestBook>('books', StoreActions.AddEntities, { payload: { data: createMockEntities(10, 12) } });
    expect(store._value().ids.length).toBe(4);

    runStoreAction<TestBook>('books', StoreActions.UpdateEntities, {
      payload: {
        data: { title: 'New title' },
        entityIds: 2
      }
    });
    expect(store._value().entities[2].title).toBe('New title');

    runStoreAction<TestBook>('books', StoreActions.RemoveEntities, { payload: { entityIds: 1 } });
    expect(store._value().entities[1]).toBeUndefined();

    runStoreAction<TestBooksState>('books', StoreActions.Update, { payload: { data: { filter: 'COMPLETE' } } });
    expect(store._value().filter).toBe('COMPLETE');
  });
});
