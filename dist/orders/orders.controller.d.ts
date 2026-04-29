import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(body: CreateOrderDto): {
        id: string;
        studentId: string;
        items: any[];
        total: number;
        status: string;
    };
    getAllData(): {
        parents: {
            id: string;
            name: string;
            walletBalance: number;
        }[];
        students: {
            id: string;
            name: string;
            allergens: string[];
            parentId: string;
        }[];
        menuItems: {
            id: string;
            name: string;
            price: number;
            allergens: string[];
            available: boolean;
        }[];
        orders: any[];
    };
}
