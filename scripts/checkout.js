
import { renderOrderSummary } from "./checkout/order-summery.js";
import { renderPaymentSummary } from "./checkout/payment-summery.js"
import { loadProjects} from "../data/products.js";

// import '../data/cart-class.js'

//import '../data/backend-practice.js'
loadProjects(()=>{
    renderOrderSummary();

    renderPaymentSummary();
})

