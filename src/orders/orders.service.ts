import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AppException } from '../common/exceptions';

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

const orders: any[] = [];

@Injectable()
export class OrdersService {
  createOrder(studentId: string, items: any[]) {
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new AppException(
        "EMPTY_ITEMS",
        "Items cannot be empty"
      );
    }
    const student = studentMap.get(studentId);
    if (!student) throw new AppException("STUDENT_NOT_FOUND", "Student not found");

    const parent = parentMap.get(student.parentId);
    if (!parent) throw new AppException("PARENT_NOT_FOUND", "Parent not found");

    let total = 0;

    for (const item of items) {
      const menuItem = menuItemMap.get(item.menuItemId);

      if (!menuItem)
        throw new AppException("ITEM_NOT_FOUND", "Menu item not found");

      if (!menuItem.available)
        throw new AppException("ITEM_UNAVAILABLE", "Item unavailable");

      const hasAllergen = menuItem.allergens.some(a =>
        student.allergens.includes(a)
      );
      if (hasAllergen)
        throw new AppException("ALLERGEN_CONFLICT", "Allergen conflict");

      total += menuItem.price * item.quantity;
    }
    if (parent.walletBalance < total)
      throw new AppException("INSUFFICIENT_BALANCE", "Insufficient balance");
    const order = {
      id: uuidv4(),
      studentId,
      items,
      total,
      status: "PENDING"
    };
    orders.push(order);
    try {
      parent.walletBalance -= total;
      order.status = "CONFIRMED";
    } catch (err) {
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
}