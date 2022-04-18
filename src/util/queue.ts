import { Iqueue } from "../interface/queue.interface";

class Queue<T> implements Iqueue<T> {
    readonly storage: T[] = [];

    public add(item: T): void {
        this.storage.push(item);
    }

    public pop(start?: number): T | undefined {
        return start ? this.storage.splice(start, 1)[0] : this.storage.shift();
    }

    public shift(): T | undefined {
        return this.storage.shift();
    }

    get getSize(): number {
        return this.storage.length;
    }
}

export default Queue;