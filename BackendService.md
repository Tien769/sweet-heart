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

Kiểm tra trạng thái đăng nhập và trả về thông tin người dùng của session hiện tại nếu có.

Cấu trúc json trả về:

```json
{
  "authenticated": true, // or false
  "user": {
    "name": "Some Name",
    "email": "Some Email",
    "address": "Some Password",
    "phone": "Some Phone Number"
  }
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

### 4. updateAccountAsync

Dùng để cập nhật thông tin về tài khoản người dùng.

Các thông tin có thể cập nhật bao gồm: name, phone, address, password. Lưu ý: **_HÀM NÀY KHÔNG CẬP NHẬT EMAIL_**

Cú pháp gọi hàm bao gồm một tham số, chứa thông tin cần cập nhật.

Ví dụ:

```jsx
function SomeComponent() {
  useEffect(() => {
    updateAccountAsync({
      email: 'current email',
      name: 'new name',
      address: 'new address',
      phone: 'new phone',
    }).then(res => {
      console.log(res);
    });
  });

  return <div>SOME COMPONENT</div>;
}
```

**Lưu ý**:

- Trong đối tượng tham số đầu vào, thuộc tính email là thuộc tính bắt buộc, để xác định tài khoản cần được cập nhật. Bên cạnh đó, người dùng bắt buộc phải đăng nhập để
  thực hiện thay đổi thông tin.

- Các thuộc tính còn lại của đối tượng tham số là optional, chỉ truyền giá trị cho thuộc tính nào cần cập nhật.

  Ví dụ: đối tượng tham số với giá trị:

  ```jsx
  {
    email: 'mail@gmail.com';
    name: 'Jack';
  }
  ```

  Khi thực thì hàm, tài khoản với email là _mail@gmail.com_ sẽ được cập nhật. Các thông tin được cập nhật là **_name_** với giá trị mới là **_Jack_**. Những thông tin còn lại
  (phone, address) sẽ được giữ giá trị cũ.

- Giá trị trả về của server tương tự như hàm **_checkAuthenticationAsync_**, với thông tin **_ĐÃ ĐƯỢC CẬP NHẬT_**.

### 5. getAllProductsAsync

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

### 6. searchProductAsync

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

### 7. getProductImageUrl

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

### 8. getCartItems

Lấy danh sách các sản phẩm trong giỏ hàng. Cấu trúc dữ liệu tương tự như getAllProductsAsync và searchProductAsync.

Tuy nhiên, mỗi sản phẩm có thể một thuộc tính là **_quantity_**, số lượng của sản phẩm trong giỏ hàng.

Ví dụ:

```jsx
function SomeComponent() {

  useEffect(() => {
    getCartItems().then(res => {
      console.log(res.cart)
    })

  },[...])

  return <div></div>;
}
```

### 9. addCartItem, removeCartItem

Được dùng để thêm hoặc loại bỏ một sản phẩm ra khỏi giỏ hàng.

**_addCartItem_** sẽ thêm sản phẩm với số lượng mặc định là 1. Nếu hàm này được gọi với một sản phẩm đã nằm trong giỏ hàng, số lượng của sản phẩm đó sẽ được cập nhật thêm 1 đơn vị.

**_removeCartItem_** không thay đổi số lượng của sản phẩm. Khi được gọi với một item, item đó sẽ bị xóa khỏi cart hoàn toàn.

Cú pháp gọi cả hai hàm này bao gồm một tham số, là đối tượng sản phẩm cần thao tác. Đối tượng này có thể được lấy từ getAllProductsAsync hoặc searchProductAsync.

Ví dụ:

```jsx
function SomeComponent() {
  const [prod, setProd] = useState({});

  useEffect(() => {
    getAllProductsAsync()
      .then(res => res.product_list)
      .then(list => {
        setProd(list[0]);
      });
  }, []);

  function addToCart() {
    addCartItem(prod);
  }

  function removeFromCart() {
    removeCartItem(prod);
  }

  return (
    <div id='ProductCard'>
      <button onClick={addToCart}>Add to Cart</button>
      <button onClick={removeFromCart}>Remove from Cart</button>
    </div>
  );
}
```

### 10. setCartItemQuantity

Đặt giá trị số lượng cho một item trong giỏ hàng.

Cú pháp gọi bao gồm một tham số sản phẩm và một tham số số lượng.

Ví dụ:

```jsx

// Sản phẩm cần thao tác
const prod = ...
setCartItemQuantity(prod, 5) // Đặt số lượng sản phẩm là 5

```

### 11. emptyCart

Reset trạng thái giỏ hàng. Xóa toàn bộ sản phẩm.
