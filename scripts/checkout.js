
import { renderOrderSummary } from "./checkout/order-summery.js";
import { renderPaymentSummary } from "./checkout/payment-summery.js"
import { loadProdects} from "../data/products.js";


        loadProdects().then(()=>{
            renderOrderSummary();
            renderPaymentSummary();
        });

