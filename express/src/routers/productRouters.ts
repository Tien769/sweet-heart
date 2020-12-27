import { Router, NextFunction, Request, Response } from 'express';
import { getAllProducts, searchProducts } from '../services/productService';
import { PlainObject, ResponseMessage } from '../_types';
import fs from 'fs';
import * as ProductService from '../services/productService';
import path from 'path';
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

router.post('/get', (req, res, next) => {
  let productId = req.body.productId;
  ProductService.getProduct(productId, (err, prod) => {
    if (err) res.locals.err = new ResponseMessage(500, { error: 'INTERNAL ERROR' });
    else res.locals.msg = new ResponseMessage(200, { prod: prod });
    return next();
  });
});

router.post('/add', (req, res, next) => {
  const img = (req.files as PlainObject).img;
  const newProd = JSON.parse(req.body.prod);
  ProductService.addProduct(newProd, (err, id) => {
    if (err) console.log(err);
    else {
      img.mv(path.resolve('img') + `/${id}.jpg`);
    }
    return next();
  });
});

router.post('/remove', (req, res, next) => {
  const id = req.body.product_id;
  ProductService.removeProduct(id, err => {
    if (err) res.locals.err = err;
    else {
      fs.unlink(path.resolve('img') + `/${id}.jpg`, err => {
        if (err) res.locals.err = new ResponseMessage(500, { error: err });
        res.locals.msg = new ResponseMessage(200, { message: 'Item is removed' });
        return next();
      });
    }
  });
});

export { router as productRouter };
