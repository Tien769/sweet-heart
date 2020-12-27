import { response, Router } from 'express';
import * as OrderService from '../services/orderService';
import { ResponseMessage } from '../_types';

const router = Router();

router.post('/store', (req, res, next) => {
  OrderService.addOrder(req.body.user, req.body.items, req.body.total, (err, serviceResponse) => {
    if (err) res.locals.err = err;
    else res.locals.msg = serviceResponse;
    return next();
  });
});

router.get('/', (req, res, next) => {
  OrderService.getAllOrders((err, serviceRes) => {
    if (err) console.log(err);
    res.locals.msg = serviceRes;
    return next();
  });
});

router.post('/remove', (req, res, next) => {
  const orderId = req.body.orderId;
  OrderService.removeOrder(orderId, err => {
    if (err) res.locals.err = new ResponseMessage(500, { error: err });
    else res.locals.msg = new ResponseMessage(200, { message: 'Done' });
    return next();
  });
});

export { router as orderRouter };
