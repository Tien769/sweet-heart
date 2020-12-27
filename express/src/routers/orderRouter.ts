import { Router } from 'express';
import * as OrderService from '../services/orderService';

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

export { router as orderRouter };
