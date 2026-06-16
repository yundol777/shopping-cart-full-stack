# step3 API 명세서

## 공통 규칙

- 요청/응답 body는 JSON 형식으로 전달한다.
- JSON 필드 이름은 영문 camelCase를 사용하고, 의미는 각 표에서 한글로 설명한다.
- `userId`는 body로 보내지 않고 인증 정보(헤더/세션)로 서버가 식별한다.
- 에러 응답은 아래 공통 형식으로 반환한다.

```json
{
  "code": "에러 코드",
  "message": "에러 메시지"
}
```

## 1. 주문 요약 계산

> 주문 확인 페이지 첫 진입 시 호출되며, 사용자의 행동에 따라 금액이 확정되어야 할 때(쿠폰 적용 및 산간지역 토글 시), 재호출됩니다.

> 변경의 이유는 다르더라도 결국 한 묶음의 주문 옵션으로 생각했기 때문에, 묶어서 하나의 API로 구현하였습니다.

```http
POST /orders/summary
```

### Request

```json
{
  "userId": 1,
  "selectedCartItemIds": ["10", "12"],
  "selectedCouponIds": ["1", "3"],
  "isRemoteArea": false
}
```

| 이름                  | 필수 여부 | 설명                                               |
| --------------------- | --------- | -------------------------------------------------- |
| `selectedCartItemIds` | 필수      | 선택된 장바구니 상품 id 배열 (1개 이상)            |
| `selectedCouponIds`   | 필수      | 적용할 쿠폰 id 배열 (최대 2개, 없으면 쿠폰 미적용) |
| `isRemoteArea`        | 필수      | 제주도·도서 산간 지역 체크 여부 (기본값 `false`)   |

### Response

`200 OK`

```json
{
  "orderAmount": 10000,
  "couponDiscountAmount": 5000,
  "shippingFee": 3000,
  "totalPaymentAmount": 8000
}
```

| 이름                   | 설명           |
| ---------------------- | -------------- |
| `orderAmount`          | 주문 금액      |
| `couponDiscountAmount` | 쿠폰 할인 금액 |
| `shippingFee`          | 배송비         |
| `totalPaymentAmount`   | 총 결제 금액   |

### Error

`400 Bad Request` 또는 `404 Not Found`

```json
{
  "code": "CART_ITEM_NOT_FOUND",
  "message": "존재하지 않는 장바구니 상품입니다."
}
```

| 상태 코드         | 에러 코드               | 설명                                                        |
| ----------------- | ----------------------- | ----------------------------------------------------------- |
| `400 Bad Request` | `INVALID_CART_ITEM_IDS` | `selectedCartItemIds`가 없거나 빈 배열인 경우               |
| `404 Not Found`   | `CART_ITEM_NOT_FOUND`   | 해당 `cartItemId`의 장바구니 상품이 존재하지 않는 경우      |
| `404 Not Found`   | `COUPON_NOT_FOUND`      | 해당 `couponId`의 쿠폰이 존재하지 않는 경우                 |
| `400 Bad Request` | `EXCEEDS_COUPON_LIMIT`  | 적용하려는 쿠폰이 최대 적용 개수(2장)를 초과한 경우         |
| `400 Bad Request` | `COUPON_NOT_APPLICABLE` | 만료·사용 완료·적용 조건 미달 등 적용할 수 없는 쿠폰인 경우 |

## 2. 쿠폰 목록 조회

```http
GET /coupons
```

### Request

```json
요청 파라미터가 없습니다.
```

### Response

`200 OK`

보유한 쿠폰이 없으면 `coupons`는 빈 배열을 응답한다.

```json
{
  "orderAmount": 100000,
  "coupons": [
    {
      "couponId": "3465",
      "couponName": "5,000원 할인 쿠폰",
      "discountType": "정액",
      "isApplicable": true,
      "discountAmount": 5000
    },
    {
      "couponId": "3466",
      "couponName": "30% 할인 쿠폰",
      "discountType": "정률",
      "isApplicable": true,
      "discountAmount": 30
    }
  ]
}
```

| 이름             | 설명                                              |
| ---------------- | ------------------------------------------------- |
| `orderAmount`    | 선택된 상품 기준 전체 주문 금액                   |
| `couponId`       | 쿠폰 식별 id                                      |
| `couponName`     | 쿠폰 이름                                         |
| `discountType`   | 할인 타입 (`정액` / `정률` / `무료배송` / `증정`) |
| `isApplicable`   | 활성화(적용 가능) 여부                            |
| `discountAmount` | 현재 주문 기준 할인 금액 (적용 불가 시 `0`)       |

### Error

| 상태 코드         | 에러 코드               | 설명                                                     |
| ----------------- | ----------------------- | -------------------------------------------------------- |
| `400 Bad Request` | `INVALID_CART_ITEM_IDS` | `selectedCartItemIds`가 없거나 형식이 유효하지 않은 경우 |
| `404 Not Found`   | `CART_ITEM_NOT_FOUND`   | 해당 `cartItemId`의 장바구니 상품이 존재하지 않는 경우   |
