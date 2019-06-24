export interface IZombieItem {
  id: number;
  name: string;
  price: number;
  isVisible?: boolean;
}

export interface IZombieItemDto {
  timestamp: number,
  items: IZombieItem[],
}