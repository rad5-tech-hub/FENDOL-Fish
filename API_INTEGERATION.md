# V2 Website Customer Frontend Integration

This guide explains how to integrate the public website customer flows exposed by [src/route/v2/wesiteCustomerRoute.js](../src/route/v2/wesiteCustomerRoute.js):

- Signup OTP request
- Signup OTP verification (returns auth token)
- Password login (returns auth token)
- Customer logout

## Base URL

The v2 router is mounted in [app.js](../app.js), so endpoints are served under:

- `/v2`

Example:

- Local: `http://localhost:3000/v2`
- Production: `https://your-domain.com/v2`

## Endpoints

### 1. Request Signup OTP

- Method: `POST`
- Path: `/customers/public`
- Purpose: Creates or updates an unverified customer and sends OTP to email.

Request body:

```json
{
  “fullName”: “Jane Doe”,
  “phone”: “+2348012345678”,
  “email”: “jane@example.com”,
  “password”: “strong-password”,
  “category”: “Retail”,
  “address”: “12 Marina, Lagos”
}
```

Validation rules from [src/validations/customerValidation.js](../src/validations/customerValidation.js):

- `fullName`: required, string, min 2, max 100
- `phone`: optional, must include country code format (E.164), e.g. `+2348012345678`
- `email`: required, valid email
- `password`: required, string, min 5, max 128
- `category`: optional, string, min 2, max 100
- `address`: required, string, min 2, max 255

Success response (`200`):

```json
{
  “success”: true,
  “response_message”: “Verification code sent successfully. Please verify OTP to complete signup.”
}
```

Possible errors:

- `400`: validation error (invalid/missing fields)
- `409`: email already exists and is already verified
- `429`: rate-limit reached
- `500`: server/configuration issue

### 2. Verify Signup OTP

- Method: `POST`
- Path: `/customers/public/verify-otp`
- Purpose: Verifies OTP and marks email as verified.

Request body:

```json
{
  “email”: “jane@example.com”,
  “otp”: “123456”
}
```

Validation rules from [src/validations/customerValidation.js](../src/validations/customerValidation.js):

- `email`: required, valid email
- `otp`: required, exactly 6 digits

Success response (`200`):

```json
{
  “success”: true,
  “response_message”: “Email verified successfully. Signup complete.“,
  “data”: {
    “id”: “uuid”,
    “fullName”: “Jane Doe”,
    “email”: “jane@example.com”,
    “emailVerified”: true,
    “accessToken”: “jwt_token”,
    “expiresIn”: “7d”
  }
}
```

Also possible on success path (`200`):

```json
{
  “success”: true,
  “response_message”: “Email is already verified.”
}
```

Possible errors:

- `400`: invalid OTP, expired OTP, no active OTP, or body validation failure
- `404`: signup request not found for email
- `429`: max OTP attempts reached or rate-limit reached
- `500`: unexpected server error

### 3. Customer Login (Password)

- Method: `POST`
- Path: `/customers/public/login`
- Purpose: Authenticates a verified website customer with email and password.

Request body:

```json
{
  “email”: “jane@example.com”,
  “password”: “your-password”
}
```

Validation rules:

- `email`: required, valid email
- `password`: required, string, min 5, max 128

Success response (`200`):

```json
{
  “success”: true,
  “response_message”: “Login successful.“,
  “data”: {
    “id”: “uuid”,
    “fullName”: “Jane Doe”,
    “email”: “jane@example.com”,
    “emailVerified”: true,
    “accessToken”: “jwt_token”,
    “expiresIn”: “7d”
  }
}
```

Possible errors:

- `400`: body validation failure
- `401`: invalid email or password
- `429`: rate-limit reached
- `500`: unexpected server error

### 4. Customer Logout

- Method: `POST`
- Path: `/customers/public/logout`
- Purpose: Ends customer session on the client side and clears auth cookies if present.

Request body:

- No body required.

Success response (`200`):

```json
{
  “success”: true,
  “response_message”: “Logout successful.”
}
```

Possible errors:

- `401`: invalid token format/type when Authorization header is sent
- `500`: unexpected server error

## Error Response Shape

From the global error handler in [app.js](../app.js), error responses follow:

```json
{
  “success”: false,
  “response_message”: “Error message”,
  “error”: {
    “name”: “ErrorName”,
    “message”: “Error message”,
    “statusCode”: 400
  }
}
```

For Joi validation middleware, current validation errors may use:

```json
{
  “success”: false,
  “message”: “Validation error”,
  “errors”: [“\”email\” is required”]
}
```

## Frontend Flows

### Signup flow

1. Collect signup form values and call `POST /v2/customers/public`.
2. Show OTP entry screen after successful response.
3. Call `POST /v2/customers/public/verify-otp` with email + OTP.
4. On success, store `data.accessToken` and treat customer as logged in.

### Login flow

1. Collect email and password and call `POST /v2/customers/public/login`.
2. On success, store `data.accessToken` and continue authenticated session.

### Logout flow

1. Call `POST /v2/customers/public/logout`.
2. Clear token from client storage and redirect to login/public page.

For `400/404/409/429`, show `response_message` (or validation `errors[0]`) to the user.

## Axios Example

```javascript
import axios from “axios”;

const api = axios.create({
  baseURL: “https://your-domain.com/v2”,
  withCredentials: false,
});

export async function requestSignupOtp(payload) {
  const { data } = await api.post(“/customers/public”, payload);
  return data;
}

export async function verifySignupOtp(payload) {
  const { data } = await api.post(“/customers/public/verify-otp”, payload);
  return data;
}

export async function loginCustomer(payload) {
  const { data } = await api.post(“/customers/public/login”, payload);
  return data;
}

export async function logoutCustomer(token) {
  const { data } = await api.post(
    “/customers/public/logout”,
    {},
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined
  );
  return data;
}
```

## Recommended Frontend Handling

- Disable submit button while request is in flight.
- Add a short resend timer on OTP screen.
- Normalize email to lowercase before sending.
- Handle `429` explicitly with retry messaging.
- Persist token securely (for example, HttpOnly cookie via backend gateway, or secure storage strategy for your client type).
- Do not expose raw stack traces to users.

## Route Source

- Route definitions: [src/route/v2/wesiteCustomerRoute.js](../src/route/v2/wesiteCustomerRoute.js)
- Controller behavior: [src/controllers/wesiteCustomer.js](../src/controllers/wesiteCustomer.js)
- Validation schemas: [src/validations/customerValidation.js](../src/validations/customerValidation.js)