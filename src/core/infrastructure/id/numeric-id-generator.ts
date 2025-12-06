import { Injectable } from '@nestjs/common';
import { IdGenerator } from '../../application/id/id-generator.interface';

@Injectable()
export class ConsecutiveIdGenerator implements IdGenerator<number> {
  private counters = new Map<string, number>();

  generateId(entityName: string = 'book'): number {
    const currentId = this.counters.get(entityName) || 0;
    const nextId = currentId + 1;
    this.counters.set(entityName, nextId);
    return nextId;
  }
}