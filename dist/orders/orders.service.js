"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const exceptions_1 = require("../common/exceptions");
const parentMap = new Map([
    ["p1", { id: "p1", name: "John", walletBalance: 50 }]
]);
const studentMap = new Map([
    ["s1", { id: "s1", name: "Kid", allergens: ["nuts"], parentId: "p1" }],
    ["s2", { id: "s2", name: "Sara", allergens: [], parentId: "p1" }]
]);
const menuItemMap = new Map([
    ["m1", { id: "m1", name: "Peanut Bar", price: 10, allergens: ["nuts"], available: true }],
    ["m2", { id: "m2", name: "Sandwich", price: 8, allergens: [], available: true }]
]);
const orders = [];
let OrdersService = class OrdersService {
    createOrder(studentId, items) {
        if (!items || !Array.isArray(items) || items.length === 0) {
            throw new exceptions_1.AppException("EMPTY_ITEMS", "Items cannot be empty");
        }
        const student = studentMap.get(studentId);
        if (!student)
            throw new exceptions_1.AppException("STUDENT_NOT_FOUND", "Student not found");
        const parent = parentMap.get(student.parentId);
        if (!parent)
            throw new exceptions_1.AppException("PARENT_NOT_FOUND", "Parent not found");
        let total = 0;
        for (const item of items) {
            const menuItem = menuItemMap.get(item.menuItemId);
            if (!menuItem)
                throw new exceptions_1.AppException("ITEM_NOT_FOUND", "Menu item not found");
            if (!menuItem.available)
                throw new exceptions_1.AppException("ITEM_UNAVAILABLE", "Item unavailable");
            const hasAllergen = menuItem.allergens.some(a => student.allergens.includes(a));
            if (hasAllergen)
                throw new exceptions_1.AppException("ALLERGEN_CONFLICT", "Allergen conflict");
            total += menuItem.price * item.quantity;
        }
        if (parent.walletBalance < total)
            throw new exceptions_1.AppException("INSUFFICIENT_BALANCE", "Insufficient balance");
        const order = {
            id: (0, uuid_1.v4)(),
            studentId,
            items,
            total,
            status: "PENDING"
        };
        orders.push(order);
        try {
            parent.walletBalance -= total;
            order.status = "CONFIRMED";
        }
        catch (err) {
            order.status = "FAILED";
        }
        return order;
    }
    getAllData() {
        return {
            parents: Array.from(parentMap.values()),
            students: Array.from(studentMap.values()),
            menuItems: Array.from(menuItemMap.values()),
            orders
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)()
], OrdersService);
//# sourceMappingURL=orders.service.js.map