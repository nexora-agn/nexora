/**
 * Re-export tire catalog under legacy product names for CMS / filter compat.
 */
export {
  DEMO_TIRES as DEMO_PRODUCTS,
  DEMO_TIRES,
  type TireProduct,
  type TireProduct as PhoneProduct,
  type TireCategory as ProductCategory,
  type ProductCondition,
} from "./tires";
