import { Router, NextFunction, Request, Response } from 'express';
import { getAllProducts, searchProducts } from '../services/productService';
import { ResponseMessage } from '../_types';
const router = Router();

// -------------------------------------------MIDDLEWARE-------------------------------------------
const parseParameters = (req: Request, res: Response, next: NextFunction) => {
  res.locals.queryOption = {};
  if (req.query.name) res.locals.queryOption.name = req.query.name;
  if (req.query.type) res.locals.queryOption.type = req.query.type;
  return next();
};

// -------------------------------------------ROUTINGS-------------------------------------------
router.get('/', (_, res, next) => {
  if (res.locals.err) return next();
  getAllProducts((err, list) => {
    if (err) res.locals.err = err;
    else res.locals.msg = new ResponseMessage(200, { product_list: list });
    return next();
  });
});

router.get('/s', parseParameters, (_, res, next) => {
  searchProducts(res.locals.queryOption, (err, list) => {
    if (err) res.locals.err = err;
    else res.locals.msg = new ResponseMessage(200, { product_list: list });
    return next();
  });
});

export { router as productRouter };
