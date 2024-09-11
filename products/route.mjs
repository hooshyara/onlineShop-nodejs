import  express  from "express";
import { product, productDetail, productCreate, productUpdate } from "./view.mjs";

const router = express.Router()

router.get('/', product);
router.get('/:id', productDetail);
router.post('/add', productCreate);
router.post('/update/:id', productUpdate);

export default router;