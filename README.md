# Order System API

## Features
- DTO validation
- Structured error handling
- Clean architecture
- Map-based O(1) lookup

## Run
npm install
npm run start

## Endpoint
POST /orders



## Key Design Decisions

- Used in-memory Maps instead of a database for simplicity and fast setup.
- Applied a single-item-per-order rule to simplify cart and pricing logic.
- Centralized validations and errors using a custom AppException.
- Performed all business rules on the backend (student, parent, wallet, allergen checks).
- Updated wallet balance only after successful validation to ensure consistency.
- Moved data mapping (students/parents) to frontend for simpler backend logic.

## Trade-offs
- This implementation prioritizes simplicity and speed over production-grade architecture.
- In-memory storage was used instead of a database to reduce setup complexity, but sacrifices persistence and scalability.
- Business logic is handled synchronously without transactions, which may lead to inconsistencies in failure scenarios.
- The system is designed as a monolith for simplicity, but would need decomposition into microservices for scaling.
- Strict TypeScript mode improves safety but increases initial development overhead.

## Assumptions Made
- Each student belongs to exactly one parent.
- Each order contains only one item (single-item cart rule).
- All students, parents, and menu items are pre-defined in the system.
- Wallet balance is always a valid numeric value.
- Orders are processed synchronously (no queues or async workflows).
- No authentication or authorization layer is required for this implementation.
- Data is stored in memory, so it resets when the server restarts.

## AI Tools Used (Optional)
- ChatGPT was used to assist with:
- Structuring backend and frontend code
- Improving error messages and validation logic
- Refining documentation (design decisions, trade-offs)


# if you do not implement a database transaction, briefly explain how you would handle this in a real system.

- In this project, consistency is handled using order status tracking. The order is first created with status PENDING, and then updated to CONFIRMED or FAILED based on wallet deduction result.

- In production systems, database transactions would be used to ensure atomicity between order creation and wallet deduction, so either both operations succeed or both fail together.



## Part 2

# Some orders were created successfully, but the wallet balance was not deducted

## What could cause this issue?
- No database transaction between order creation and wallet deduction
- Service crash or timeout after partial execution
- Failure in multi-step process or microservice communication
- Missing retry or rollback (compensation) logic

## How to debug it?
- Check logs for order and wallet flow
- Compare order data with wallet balance
- Trace request using an ID
- Find where the process stopped
- Reproduce with the same input


## How to prevent it?

- Use database transactions for atomic operations Or use Saga pattern in distributed systems
- Add retry and rollback (compensation) logic
- Ensure idempotent APIs for safe retries
-Improve logging and monitoring for tracking flow

