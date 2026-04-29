declare class OrderItemDto {
    menuItemId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    studentId: string;
    items: OrderItemDto[];
}
export {};
