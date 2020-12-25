import { useReducer, useState } from 'react';
import { authenticateAsync } from '../lib/backendService';
import styles from './AuthenticationPage.module.scss';

// ------------------------------------------------FORM_COMPONENTS------------------------------------------------
const LoginForm = ({ changeHandler, authDetails, formSwitcher, submitHandler, error }) => {
  return (
    <form onSubmit={submitHandler}>
      <div id={styles.FormTitle}>
        <h2>Đăng nhập</h2>
      </div>
      {error.err ? <div className={styles.error}>{error.err}</div> : ''}
      <div className={styles.field}>
        <label htmlFor='email'> Email: </label>
        <input
          type='email'
          name='email'
          id='email'
          onChange={changeHandler}
          value={authDetails.email}
          autoComplete='off'
          required
        />
      </div>
      <div className={styles.field}>
        <label htmlFor='password'> Mật khẩu: </label>
        <input
          type='password'
          name='password'
          id='password'
          onChange={changeHandler}
          value={authDetails.password}
          autoComplete='off'
          required
        />
      </div>

      <input type='submit' value='Đăng nhập' />
      <div className={styles.switchForm}>
        Chưa có tài khoản?
        <span>
          <button onClick={formSwitcher}>Đăng kí ngay.</button>
        </span>
      </div>
    </form>
  );
};

const RegisterForm = ({ changeHandler, authDetails, formSwitcher, submitHandler, error }) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        <div id={styles.FormTitle}>
          <h2>Đăng ký</h2>
        </div>
        {error.err ? <div className={styles.error}>{error.err}</div> : null}
        <div className={styles.field}>
          <label htmlFor='name'> Họ và Tên: </label>
          <input
            type='text'
            name='name'
            id='name'
            onChange={changeHandler}
            value={authDetails.name}
            autoComplete='off'
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor='email'> Email: </label>
          <input
            type='email'
            name='email'
            id='email'
            onChange={changeHandler}
            value={authDetails.email}
            autoComplete='off'
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor='phone'> Số điện thoại: </label>
          <input
            type='text'
            name='phone'
            id='phone'
            onChange={changeHandler}
            value={authDetails.phone}
            autoComplete='off'
            required
          />
        </div>
        {error.phone ? <div className={styles.validError}>{error.phone}</div> : null}

        <div className={styles.field}>
          <label htmlFor='address'> Địa chỉ: </label>
          <input
            type='text'
            name='address'
            id='address'
            onChange={changeHandler}
            value={authDetails.address}
            autoComplete='off'
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor='password'> Mật khẩu: </label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={changeHandler}
            value={authDetails.password}
            autoComplete='off'
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor='password'> Xác nhận mật khẩu: </label>
          <input
            type='password'
            name='rePassword'
            onChange={changeHandler}
            value={authDetails.rePassword}
            autoComplete='off'
            required
          />
        </div>

        {error.password ? <div className={styles.validError}>{error.password}</div> : null}

        <input type='submit' value='Đăng ký' />
        <div className={styles.switchForm}>
          Bạn đã có tài khoản?
          <span>
            <button onClick={formSwitcher}>Đăng nhập ngay.</button>
          </span>
        </div>
      </div>
    </form>
  );
};

// ------------------------------------------------PAGE_DEFINITION------------------------------------------------
const Page = () => {
  const [mode, setMode] = useState(1);
  const [error, setError] = useState({});
  const [authDetails, setAuthDetails] = useReducer(reducer, {
    email: '',
    name: '',
    phone: '',
    address: '',
    password: '',
    rePassword: '',
  });

  const handleFormChange = e => {
    setAuthDetails({ type: e.target.name, value: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!mode) {
      let error = validateRegisterForm(authDetails);
      if (Object.getOwnPropertyNames(error).length) {
        setError(error);
        return;
      } else {
        setError({});
        authenticateAsync(authDetails, 'signup')
          .then(res => console.log(res))
          .catch(res => {
            setError({ err: res.error });
          });
      }
    } else
      authenticateAsync(authDetails, 'signin')
        .then(res => console.log(res))
        .catch(res => setError({ err: res.error }));
  };

  return (
    <>
      <div id={styles.AuthForm}>
        {mode ? (
          <LoginForm
            authDetails={authDetails}
            changeHandler={handleFormChange}
            submitHandler={handleSubmit}
            formSwitcher={() => setMode(m => !m)}
            error={error}
          />
        ) : (
          <RegisterForm
            authDetails={authDetails}
            changeHandler={handleFormChange}
            submitHandler={handleSubmit}
            formSwitcher={() => setMode(m => !m)}
            error={error}
          />
        )}
      </div>
    </>
  );
};

// ------------------------------------------------UTILS------------------------------------------------
const reducer = (state, action) => {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.value };

    case 'name':
      return { ...state, name: action.value };

    case 'phone':
      return { ...state, phone: action.value };

    case 'address':
      return { ...state, address: action.value };

    case 'password':
      return { ...state, password: action.value };

    case 'rePassword':
      return { ...state, rePassword: action.value };

    default:
      return;
  }
};

const validateRegisterForm = authValues => {
  let errorObj = {};
  if (
    !String(authValues.phone).match(/^[0-9]+$/) ||
    authValues.phone.length < 9 ||
    authValues.phone.length > 14
  )
    errorObj.phone = 'Số điện thoại không hợp lệ';

  if (authValues.password !== authValues.rePassword)
    errorObj.password = 'Xác nhận mật khẩu không trùng khớp';

  if (authValues.password.length < 8) errorObj.password = 'yêu cầu mật khẩu trên 8 ký tự';

  return errorObj;
};

export { Page as AuthenticationPage };
