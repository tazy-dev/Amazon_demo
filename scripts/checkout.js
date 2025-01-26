
import { renderOrderSummary } from "./checkout/order-summery.js";
import { renderPaymentSummary } from "./checkout/payment-summery.js"
import { loadProjects,loadProdects} from "../data/products.js";


        loadProdects().then(()=>{
            renderOrderSummary();
            renderPaymentSummary();
        });

