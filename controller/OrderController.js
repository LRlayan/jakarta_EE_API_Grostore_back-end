import Order from "../model/Order.js";
import {orders,store,itemQtydetails,itemNames} from "../db/DB.js"
// import { updateStoreQuantities } from "./StoreController";

let uniPrice = 0;
var subTot = 0;
let discount = 0;
var setReduceQTY = 0;
var canselBtnIncrement = 0
let ItemDTO = {};

var checkOrderId = false;
var checkDate = false;
var checkName = false;
var checkCity = false;
var checkTel = false;
var checkSName = false;
var checkSQTY = false;
var checkSOrderQTY = false;
var checkSPrice = false;
var checkSDiscount = false;

var generateOrderId = 0;
let income = 0;
var dis = 0;

window.onload = valuesGetOrSendInDatabase("customer","GET","getDataCus");
window.onload = valuesGetOrSendInDatabase("item","GET","getDataItem");
window.onload = loadTable();

    $('#placeOrder-tab').on('click',()=>{
        checkOrderId = true;
        checkName = true;
        checkCity = true;
        checkTel = true;
        checkSName = true;
        checkSQTY = true;
        checkSPrice = true;

        if(generateOrderId == 0){
            $('#orderId').val('O0-1');
        }

        autoGenerateOrderId();

        validation('#orderId','#date','#cusName','#cusCity','#cusTel','#itemNameP','#qtyOnHandP','#inputPriceP','#discountOrder','#orderQTYP','#addToCartBtn');
        store.map(function (store){
            uniPrice = store.unitPrice;
        });
    });

    $('#purchaseBtn').prop('disabled', true);
    $('#cancelBtn').prop('disabled', true);

    function autoGenerateOrderId(){
        generateOrderId = 1;
        valuesGetOrSendInDatabase('order','GET','')
            .then(jsonDTO =>{
                if(generateOrderId > 0){
                    jsonDTO.forEach(order => {  
                        let OID = order.orderID;
                        let parts = OID.split("-");
                        let split = parts[1]; // Gets the part after the hyphen
                        let convvertToNumberInId = Number(split);
                        convvertToNumberInId++;
                        $('#orderId').val("O0-" + convvertToNumberInId++);
                    });
                }    
            });
    }

    $('#selectCustomerId').change(function() {
        var selectedValue = $(this).val();

        valuesGetOrSendInDatabase('customer', 'GET', '')
        .then(jsonDTO => {
            jsonDTO.forEach(customer => {
                if (selectedValue === customer.id){
                    $('#cusName').val(customer.name);
                    $('#cusCity').val(customer.city);
                    $('#cusTel').val(customer.tel);
                }
            });
        })
        .catch(error => {
            console.error(error);
        });
    });

    $('#selectItemCode').change(function() {
        // Get the selected value using val()
        var selectedValue = $(this).val();

        valuesGetOrSendInDatabase('item', 'GET', '')
        .then(jsonDTO => {
            jsonDTO.forEach(item => {
                if (selectedValue === item.itemCode){
                    $('#itemNameP').val(item.itemName);
                    $('#qtyOnHandP').val(item.QTYOnHand);
                    $('#inputPriceP').val(item.unitPrice);
                    uniPrice = item.unitPrice;
                }
            });
        })
        .catch(error => {
            console.error(error);
        });
    });

    $('#orderQTYP').on('input', ()=>{
        let selectedValue = $("#orderQTYP").val();

        let total = (selectedValue*uniPrice);
        $('#inputPriceP').val(total);
    })

    $('#addToCartBtn').click(function() {

        var orId = $('#orderId').val();
        var dates = $('#date').val();
        var customerId = $('#selectCustomerId').val();
        var customerName = $('#cusName').val();
        var customerCity = $('#cusCity').val();
        var customerTel = $('#cusTel').val();
        var itemCode = $('#selectItemCode').val();
        var iName = $('#itemNameP').val();
        var orderQty = $('#orderQTYP').val();
        var discountRate = $('#discountOrder').val();

        var inputName = $('#itemNameP').val();
        var inputPrice = $('#inputPriceP').val();
        var qty = $('#orderQTYP').val();
        discount = $('#discountOrder').val();

        var QTYOnHand = $('#qtyOnHandP').val();
        var newQTY = QTYOnHand - qty;
        console.log("new QTY",newQTY);
        
        ItemDTO = {
            type:"list",
            updateEachItemQTY:itemQtydetails
        }

        let data = {
            type:ItemDTO.type,
            itemCode:itemCode,
            itemName:iName,
            QTYOnHand:newQTY,
            unitPrice:uniPrice
        }

        itemQtydetails.push(data);
        console.log("length : ",ItemDTO.updateEachItemQTY.length);
        

        // Create a container for each item detail
        var itemContainer = $('<div class="item-container"></div>').css({display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px'});

        // Create a new paragraph element with item details
        var itemName = $('<p>').text(inputName).css({marginBottom:'5px' , marginRight:'15px'});
        var itemUnitPrice = $('<p class="unit-price">').text(' rs : ' + uniPrice + ' x').css({marginBottom:'5px' , marginRight:'5px'});
        var itemQTY = $('<p class="qty">').text(qty).css({marginBottom:'5px'});
        var newItemPrice = $('<p class="price">').text(inputPrice).css({textAlign:"right" , marginBottom:'5px'});
        var img = $('<img src="../assets/image/remove.png">').click(function (){
            
            console.log(store);
            // Remove only the container of the clicked remove icon
            $(this).closest('.item-container').remove();
            
            // Update the subtotal and balance after removing the item
            subTot -= parseFloat(newItemPrice.text());
            $('#subTotal').text(subTot);

            if (subTot >= 8000){
                dis = subTot * discount / 100;
                $('#discount').text(dis);
            } else {
                $('#discount').text(0);
            }

            $('#balance').text(subTot - dis);

            //When removing items from the cart, the content is increased
            //  for (let i = 0; i < itemNames.length; i++) {
            //     if (itemName.text() === itemNames[i]) {
            //         $('#qtyOnHandP').val(parseInt($('#qtyOnHandP').val()) + parseInt(itemQTY.text()));
            //     }
            // }

            // Disable buttons if cart is empty
            if ($('.item-container').children().length === 0) {
                $('#purchaseBtn').prop('disabled', true);
                $('#cancelBtn').prop('disabled', true);
            }
        });

        let orderData = {
            orderId:orId,
            date:dates,
            cusId:customerId,
            cusName:customerName,
            city:customerCity,
            tel:customerTel,
            itemCode:itemCode,
            itemName:iName,
            orderQTY:orderQty,
            unitPrice:uniPrice
        }
        store.push(orderData);
        itemNames.push(itemName.text());

        // Append elements to the container
        itemContainer.append(itemName);
        itemContainer.append(itemUnitPrice);
        itemContainer.append(itemQTY);
        itemContainer.append(newItemPrice);
        itemContainer.append(img);

        // Append the new paragraph to the cart container
        $('#itemNameLabel').append(itemContainer);
        $('#unit-price').append(itemContainer);
        $('#itemQty').append(itemContainer);
        $('#itemPriceListMainDiv').append(itemContainer);
        $('#orderRemove').append(itemContainer);

        var value = parseFloat(newItemPrice.text());
        subTot += value;

        $('#subTotal').text(subTot);

        if (subTot >= 8000){
            dis = subTot*discount/100;
            $('#discount').text(dis);
        }

        $('#balance').text(subTot-dis);

        if (itemName !== '' && newItemPrice !== ''){
            $('#purchaseBtn').prop('disabled', false);
            $('#cancelBtn').prop('disabled', false);
        }

        var QtyOnHand = $('#qtyOnHandP').val();
        var newQtyOnHand = QtyOnHand - qty;
        $('#qtyOnHandP').val(newQtyOnHand);

        $('#selectItemCode').change(function (){
            var amountQty = itemQTY.text();

            let selectedItemName = $('#itemNameP').val();
                for (let i = 0; i < itemNames.length; i++) {
                    if (selectedItemName === itemNames[i]){
                        if (itemName.text() === itemNames[i]){
                            setReduceQTY = $('#qtyOnHandP').val() - parseInt(amountQty)
                            $('#qtyOnHandP').val(parseInt(setReduceQTY));
                            amountQty = 0;
                        }
                    }
                }
            });

        let orderId = $('#orderId').val();
        let date = $('#date').val();
        let cusName = $('#cusName').val();
        let cusCity = $('#cusCity').val();
        let cusTel = $('#cusTel').val();

        let code = $('#selectItemCode').val();
        let totalPrice = $('#balance').text();
        let discounts = $('#discount').text();

        let orderDetail = new Order(orderId,date,cusName,cusCity,cusTel,code,inputName,qty,discounts,totalPrice);
        orders.unshift(orderDetail);

        $('#orderQTYP').val('');
    });

    $('#purchaseBtn').on('click',()=>{
        autoGenerateOrderId();
      
        var orderId = $('#orderId').val();
        var date = $('#date').val();
        var customerId = $('#selectCustomerId').val();
        var discountRate = $('#discountOrder').val();
        var discount = dis;
        var subTotal = subTotal;
        var total = parseFloat($('#balance').text());

        const OrderDTO = {
            orderID:orderId,
            date:date,
            cusId:customerId,
            discountRate:discountRate,
            discount:discount,
            subTotal:subTot,
            balance:total,
            orderDetails: store
        }
        
        valuesGetOrSendInDatabase("order","POST","",OrderDTO);
        valuesGetOrSendInDatabase("item","PUT","",ItemDTO);
        loadTable();
        clear();        

        $('#purchaseBtn').prop('disabled', true);
        $('#cancelBtn').prop('disabled', true);
        $('#addToCartBtn').prop('disabled', true);

        $('#itemNameLabel').empty();
        $('#unit-price').empty();
        $('#itemQty').empty();
        $('#itemPriceListMainDiv').empty();
        $('#orderRemove').empty();

        if (orders.length < 10){
            $('#ordersCount').text("0"+ orders.length);
        }else {
            $('#ordersCount').text(orders.length);
        }

        for (let i = 0; i < orders.length; i++) {
            income += parseFloat(orders[i].price);
            $('#income').text(income);
        }
    });

    $('#cancelBtn').on('click',()=>{
        cancel()
        canselBtnIncrement++;
        subTotal = 0;
        discount = 0;
        $('#purchaseBtn').prop('disabled', true);
        $('#cancelBtn').prop('disabled', true);
        $('#addToCartBtn').prop('disabled',true);
    })

    function loadTable() {
        valuesGetOrSendInDatabase("order", "GET","getData");
    }

    function valuesGetOrSendInDatabase(mappingType , methodType , getVal , dto) {
        const JsonDTO = JSON.stringify(dto);

        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            http.onreadystatechange = () => {
                if (http.readyState == 4) {
                    if (http.status == 200) {  
                        var jsonTypeResp = JSON.stringify(http.responseText);
                        const jsonDTO = JSON.parse(http.responseText); 
                        if (getVal === "getDataCus") {
                            jsonDTO.map(customer => {
                                $('#selectCustomerId').append($('<option>').text(`${customer.id}`));
                            });
                        } else if(getVal === "getDataItem"){
                            jsonDTO.map(item => {
                                $('#selectItemCode').append($('<option>').text(`${item.itemCode}`));
                            });
                        }else if(getVal === "getData"){
                            $('#viewOrderDetailTable').empty()
                            jsonDTO.map(function (orderDetails){
                            let record = `<tr>
                                                <th class="o-orderId orderTableBody" scope="row">${orderDetails.orderID}</th>
                                                <th class="o-date orderTableBody">${orderDetails.date}</th>
                                                <td class="o-cusId orderTableBody">${orderDetails.cusId}</td>
                                                <td class="o-discountRate orderTableBody">${orderDetails.discountRate}</td>
                                                <td class="o-discount orderTableBody">${orderDetails.discount}</td>
                                                <td class="o-subTotal orderTableBody">${orderDetails.subTotal}</td>  
                                                <td class="o-balance orderTableBody">${orderDetails.balance}</td>  
                                        </tr>`
                            $('#viewOrderDetailTable').append(record)
                            });
                        }
                        resolve(jsonDTO); // Resolve the promise with jsonDTO
                    } else {
                        reject(`Failed with status: ${http.status}`);
                        console.log(jsonTypeResp);
                    }
                }
            }
            http.open(`${methodType}`, `http://localhost:8080/groStore_pos_system_back_end_war_exploded/${mappingType}`, true);
            if (getVal === "getData") {
                http.send(); 
            }else{
                http.setRequestHeader("Content-Type","application/json");
                http.send(JsonDTO);  
            } 
        });
    }

function clear(){
        // $('#cusName').val('');
        // $('#cusCity').val('');
        // $('#cusTel').val('');
        $('#balance').text('0.00');
        $('#discount').text('0.00');
        // $('#itemNameP').val('');
        // $('#inputPriceP').val('');
        $('#orderQTYP').val('');
        // $('#qtyOnHandP').val('');
        $('#subTotal').text('0.00');

        $('#itemNameLabel').empty();
        $('#itemPriceListMainDiv').empty();
}

function cancel(){
        $('#subTotal').text('0.00');
        $('#discount').text('0.00');
        $('#balance').text('0.00');
        $('#itemNameLabel').empty();
        $('#unit-price').empty();
        $('#itemQty').empty();
        $('#itemPriceListMainDiv').empty();
        $('#orderRemove').empty();
        $('#orderQTYP').val(0);

        for (let i = 0; i < store.length; i++) {
            if ($('#selectItemCode').val() === store[i].itemCode){
                $('#QTYOnHandP').empty();
                $('#qtyOnHandP').val(store[i].QTYOnHand);
                setReduceQTY = store[i].QTYOnHand;
            }
        }
}

function validation(orderId,today,cName,cCity,cTel,sName,sQTY,sPrice,discount,orderQty,btnId){
    (() => {
        'use strict'

        $('#addToCartBtn').prop('disabled' , true);

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('click', event => {

                $(orderId).on('input' , ()=>{
                    var id = $(orderId).val();

                    if (id.startsWith('O0-')) {
                        const numericPart = id.substring(3);

                        if (!(/^\d+$/.test(numericPart))) {
                            $('.o-id').text('Order ID must be minimum 1 digit value followed by O0- format.');
                            $('.o-id').css({ display: 'block' });
                            event.preventDefault();
                            event.stopPropagation();
                            checkOrderId = false;
                        } else {
                            $('.o-id').css({ display: 'none' });
                            $(orderId).css({border:'1px solid green'});
                            checkOrderId = true;
                        }
                    } else {
                        $('.o-id').css({ display: 'block' });
                        $(orderId).css({border:'1px solid red'});
                        event.preventDefault();
                        event.stopPropagation();
                        checkOrderId = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                });

                $(today).change(function (){
                    var date = $(today).val()
                    var currentDate = new Date();

                    var year = currentDate.getFullYear();
                    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
                    var day = ("0" + currentDate.getDate()).slice(-2);

                    if (date === year+"-"+ month + "-" + day){
                        $('.o-date').css({ display: 'none' });
                        $(today).css({ border: '1px solid green' });
                        checkDate = true;
                    }else {
                        $('.o-date').css({ display: 'block' });
                        $(today).css({ border: '1px solid red' });
                        checkDate = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                })

                $(cName).on('input' ,()=>{
                    var name = $(cName).val().trim();
                    if (name.length >= 5 && name.length <= 20 && /^[a-zA-Z ]+$/.test(name)) {
                        $('.c-name').css({ display: 'none' });
                        $(cName).css({ border: '1px solid green' });
                        checkName = true;
                    } else {
                        $('.c-name').css({ display: 'block' });
                        $(cName).css({ border: '1px solid red' });
                        checkName = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                });

                $(cCity).on('input' ,()=> {
                    var city = $(cCity).val();

                    if (city.length <= 25 && /^[a-zA-Z]+$/.test(city)) {
                        $('.c-city').css({ display: 'none' });
                        $(cCity).css({ border: '1px solid green' });
                        checkCity = true;
                    } else {
                        $('.c-city').css({ display: 'block' });
                        $(cCity).css({ border: '1px solid red' });
                        checkCity = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                });

                $(cTel).on('input' ,()=> {
                    var tel = $(cTel).val();

                    if (tel.length <= 10 && /^[0-9]+$/.test(tel)) {
                        $('.c-tel').css({ display: 'none' });
                        $(cTel).css({ border: '1px solid green' });
                        checkTel = true;
                    } else {
                        $('.c-tel').css({ display: 'block' });
                        $(cTel).css({ border: '1px solid red' });
                        checkTel = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                });


                $(sName).on('input' ,()=>{
                    var name = $(sName).val().trim();
                    if (name.length >= 5 && name.length <= 20 && /^[a-zA-Z ]+$/.test(name)) {
                        $('.s-name').css({ display: 'none' });
                        $(sName).css({ border: '1px solid green' });
                        checkSName = true;
                    } else {
                        $('.s-name').css({ display: 'block' });
                        $(sName).css({ border: '1px solid red' });
                        checkSName = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                });

                $(sQTY).on('input' ,()=> {
                    var qty = $(sQTY).val();

                    if (qty.length <= 15 && /^[0-9]+$/.test(qty)) {
                        $('.s-qty').css({ display: 'none' });
                        $(sQTY).css({ border: '1px solid green' });
                        checkSQTY = true;
                    } else {
                        $('.s-qty').css({ display: 'block' });
                        $(sQTY).css({ border: '1px solid red' });
                        checkSQTY = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                });

                $(orderQty).on('input' ,()=> {
                        let qty = $(orderQty).val();
                        let qtyOnHand = $(sQTY).val();

                        if (qty.length <= 15 && /^[0-9]+$/.test(qty) && parseInt(qtyOnHand) >= parseInt(qty)) {
                            if (!$('#orderQTYP').val().startsWith('0')){
                                $('.s-qtyOrder').css({ display: 'none' });
                                $(orderQty).css({ border: '1px solid green' });
                                checkSOrderQTY = true;
                            }
                        } else {
                            $('.s-qtyOrder').css({ display: 'block' });
                            $(orderQty).css({ border: '1px solid red' });
                            checkSOrderQTY = false;
                        }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                });

                $(sPrice).on('input' ,()=> {
                    var price = $(sPrice).val();

                    if (price.length <= 10 && /^[0-9.]+$/.test(price)) {
                        $('.s-price').css({ display: 'none' });
                        $(sPrice).css({ border: '1px solid green' });
                        checkSPrice = true;
                    } else {
                        $('.s-price').css({ display: 'block' });
                        $(sPrice).css({ border: '1px solid red' });
                        checkSPrice = false;
                    }
                    checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty);
                });

                $(discount).on('input' ,()=> {
                    var price = $(discount).val();

                    if (price.length <= 10 && /^[0-9.]+$/.test(price)) {
                        $('.s-discount').css({ display: 'none' });
                        $(discount).css({ border: '1px solid green' });
                        checkSDiscount = true;
                    } else {
                        $('.s-discount').css({ display: 'block' });
                        $(discount).css({ border: '1px solid red' });
                        checkSDiscount = false;
                    }
                    checkDiscountField(checkSDiscount,btnId);
                });
            }, false)
        })
    })()
}

function checkEmptyInputFields(checkOrderId,checkDate,checkName,checkCity,checkTel,checkSName,checkSQTY,checkSOrderQTY,checkSPrice,checkSDiscount,btnId,orderQty){
    if (checkOrderId && checkDate && checkName && checkCity && checkTel && checkSName && checkSQTY && checkSOrderQTY && checkSPrice){
        $(btnId).prop('disabled' , false);
    }else {
        $(btnId).prop('disabled' , true);
    }
}

function checkDiscountField(checkSDiscount,btnId){
    if (!checkSDiscount){
        $(btnId).prop('disabled' , true);
    }else {
        $(btnId).prop('disabled' , false);
    }
}