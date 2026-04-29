export declare class OrdersService {
    createOrder(studentId: string, items: any[]): {
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
