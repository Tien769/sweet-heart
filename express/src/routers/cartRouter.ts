import { NextFunction, Request, Response, Router } from 'express';
import { PlainObject, ResponseMessage } from '../_types';

const router = Router();

const checkAuthenticatedRequirement = (req: Request, res: Response, next: NextFunction) => {
  if (!(req.session as PlainObject)?.user)
    res.locals.err = new ResponseMessage(401, {
      error: 'USER IS NOT AUTHENTICATED',
      detail: 'User is required to be signed in to perform this action',
    });
  return next();
};

router.get('/', (req, res, next) => {
  if (res.locals.err) return next();
  res.locals.msg = new ResponseMessage(200, {
    cart: (req.session as PlainObject).cart ? (req.session as PlainObject).cart : [],
  });

  return next();
});

router.post('/add', (req, res, next) => {
  let sessionCart = (req.session as PlainObject).cart;
  if (!sessionCart) sessionCart = [];

  if (Array.isArray(sessionCart)) {
    let itemAdded = sessionCart.some(item => {
      if (item.product_id === req.body.prod.product_id) {
        item.quantity += 1;
        return true;
      }
      return false;
    });
    if (!itemAdded) sessionCart.push({ ...req.body.prod, quantity: 1 });
  }

  (req.session as PlainObject).cart = sessionCart;
  return next();
});

router.post('/quantity', (req, res, next) => {
  let sessionCart = (req.session as PlainObject).cart;

  if (Array.isArray(sessionCart)) {
    sessionCart.forEach(item => {
      if (item.product_id === req.body.prod.product_id) {
        item.quantity = req.body.prod.quantity;
      }
    });
  }

  (req.session as PlainObject).cart = sessionCart;
  return next();
});

router.post('/remove', (req, res, next) => {
  let sessionCart = (req.session as PlainObject).cart;
  console.log(sessionCart);
  if (Array.isArray(sessionCart)) {
    for (let i = 0; i < sessionCart.length; i++) {
      if (sessionCart[i].product_id === req.body.prod.product_id) {
        sessionCart.splice(i, 1);
        break;
      }
    }
  }
  (req.session as PlainObject).cart = sessionCart;
  return next();
});

router.get('/empty', (req, res, next) => {
  (req.session as PlainObject).cart = [];
  res.locals.msg = new ResponseMessage(200, { cart: (req.session as PlainObject).cart });
  return next();
});

export { router as cartRouter };
