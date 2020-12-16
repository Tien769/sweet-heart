# CÁCH SỬ DỤNG THƯ VIỆN BACKENDSERVICE

## Import thư viện

---

Import hàm cần sử dụng từ sweet-heart/react/src/lib/backendService.js:

```javascript
import { hàm-Cần- Dùng } from '{ đường-dẫn }/backendService.js'
```

Ví dụ:

```javascript
import { checkAuthenticationAsync } from './lib/backendService';
```

## Sử dụng API

---

Các hàm được viết để vận dụng tính năng **_Async_**. Các hàm có thể được gọi như sau:

```javascript
import { checkAuthenticationAsync } from './lib/backendService';

const ReactComponent = () => {
  checkAuthenticationAsync()
    .then(res => {
      // Sử dụng dữ liệu json được trả về
    })
    .catch(err => {
      // Bắt lỗi nếu có
    });

  return <div class='some-div' />;
};
```

## Chi tiết API

---

### 1. checkAuthenticationAsync

Kiểm tra trạng thái đăng nhập

Cấu trúc json trả về:

```json
{
  "authenticated": true // or false
}
```

### 2. authenticateAsync

Dùng để thực hiện đăng nhập/đăng ký

Hàm nhận 2 tham số:

- newAccount: object chứa thông tin đăng nhập/đăng ký.
- type: quyết định kiểu thao tác. Có thể mang giá trị 'signin' hoặc 'signup'.

Ví dụ:

```javascript
//...
authenticateAsync(
  {
    email: 'some_email@gmail.com',
    name: 'tien',
    address: 'Vietnam',
    phone: '012376809',
    password: 'secure_password',
  },
  'signup'
);
//...
```

### 3. unauthenticateAsync

Dùng để đăng xuất.

Cấu trúc json trả về:

```json
{
  "message": "USER IS NOW LOGGED OUT",
  "authenticated": false
}
```

### 4. getAllProductsAsync

Dùng để lấy danh sách **_toàn bộ_** sản phẩm.

Cấu trúc json trả về:

```json
{
  "product_list": [
    {
      "type": "some_type",
      "name": "some_name",
      "price": "some_price"
    }
    //...
  ]
}
```

### 5. searchProductAsync

Dùng để lấy danh sách sản phẩm theo điều kiện.

Cú pháp hàm nhận một tham số là object định nghĩa điều kiện:

```javascript
// ...
searchProductAsync({
  name: 'some_name',
  type: 'some_type',
});
// ...
```

```javascript
// Chỉ tìm theo 'name'
searchProductAsync({
  name: 'some_name',
});
// ...
```

```javascript
// Chỉ tìm theo 'type'
searchProductAsync({
  type: 'some_type',
});
// ...
```

### 6. getProductImageUrl

---

Trả về đường dẫn hình ảnh của sản phẩm. Truyền giá trị trả về cho tag **_img_** để hiển thị hình ảnh.

Cú pháp hàm nhận một tham số là id hình ảnh của sản phẩm. Id này có thể được tìm thấy trong dữ liệu trả về của **_searchProductAsync_** hoặc **_getAllProductsAsync_**

Ví dụ:

```jsx
function SomeComponent() {
  return (
    <div>
      <img src={getProductImageUrl(1)} alt='' />
    </div>
  );
}
```
