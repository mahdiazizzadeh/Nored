export interface Iqueue<T> {
  add: (item: T) => void;
  pop: (start?: number) => T | undefined;
  shift: () => T | undefined;
}
