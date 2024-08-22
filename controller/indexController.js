import {orders,store,customer} from "../db/DB.js"

let clickOrderTableRow = null;
var rate = 0;
let total = 0;

var checkOrderId = false;
var checkDate = false;
var checkCusId = false;
var checkCity = false;
var checkTel = false;
var checkCode = false;
var checkItemName = false;
var checkOrderQty = false;

var checkRate = false;
var checkDis = false;
var checkSubtotal = false;
var checkPrice = false;

$('#updateOrderModal').on('shown.bs.modal', function() {
    checkEmptyFieldUpdateModal('#updateOrderDetail');
    validationModel('#inputOrderId','#dateU','#-inputCusId','#rate','#inputDiscount','#inputSubTotal','#inputPrice','#updateOrderDetail');
});

$('#removeOrderModal').on('shown.bs.modal', function() {
    $('#orderIdR').prop('disabled' , true);
    $('#inputCustomerIdR').prop('disabled' , true);
    // $('#itemNameRe').prop('disabled' , true);
    $('#inputPriceR').prop('disabled' , true);
    checkEmptyFieldRemoveModal('#removeOrder');
});

function checkEmptyFieldRemoveModal(btn){
    var code = $('#orderIdR').val();
    var cusId = $('#inputCustomerIdR').val();
    // var itemName = $('#itemNameRe').val();
    var price = $('#inputPriceR').val();

    if (code == '' && cusId == '' && price == ''){
        $(btn).prop('disabled' , true);
    }else {
        $(btn).prop('disabled' , false);

        checkOrderId = true;
        checkDate = true;
        checkCusId = true;
        // checkCity = true;
        // checkTel = true;
        // checkCode = true;
        // checkItemName = true;
        // checkOrderQty = true;
        checkRate = true;
        checkDis = true;
        checkSubtotal = true;
        checkPrice = true;
    }
}

function checkEmptyFieldUpdateModal(btn){
    var orderId = $('#inputOrderId').val();
    var date = $('#dateU').val();
    var cusId = $('#-inputCustomerId').val();
    // var cusName = $('#customerNameU').val();
    // var city = $('#inputCityStore').val();
    // var tel = $('#inputTelephone').val();
    // var code = $('#inputItemCode').val();
    // var itemName = $('#inputItemName').val();
    // var orderQty = $('#orderQTY').val();
    var rate = $('#rate').val();
    var dis = $('#inputDiscount').val();
    var subTotal = $('#inputSubTotal').val();
    var price = $('#inputPrice').val();

    if (orderId == '' && date == '' && cusId == '' && rate == '' && dis == '' && subTotal == '' && price == ''){
        $(btn).prop('disabled' , true);
    }else {
        $(btn).prop('disabled' , false);

        checkOrderId = true;
        checkDate = true;
        checkCusId = true;
        // checkCity = true;
        // checkTel = true;
        // checkCode = true;
        // checkItemName = true;
        // checkOrderQty = true;
        checkRate = true;
        checkDis = true;
        checkSubtotal = true;
        checkPrice = true;
    }
}

$('#customer-sec').css({display:'none'});

$('#dashboard-tab').on('click' , () =>{
    $('#dash-sec').css({display:'block'});
    $('#footer').css({display: 'block'});
    $('#customer-sec').css({display:'none'});
    $('#store-sec').css({display:'none'});
    $('#placeOrder-sec').css({display:'none'});
})

$('#customer-tab').on('click' , () =>{
    $('#customer-sec').css({display:'block'});
    $('#placeOrder-sec').css({display:'none'});
    $('#dash-sec').css({display:'none'});
    $('#footer').css({display: 'none'});
    $('#store-sec').css({display:'none'});
});

$('#store-sec').css({display:'none'})
$('#store-tab').on('click' , () => {
    $('#store-sec').css({display:'block'});
    $('#placeOrder-sec').css({display:'none'});
    $('#customer-sec').css({display:'none'});
    $('#dash-sec').css({display:'none'});
    $('#footer').css({display:'none'});
});

$('#placeOrder-sec').css({display:'none'});

$('#placeOrder-tab').on('click' , () => {
    $('#placeOrder-sec').css({display:'block'});
    $('#store-sec').css({display:'none'});
    $('#customer-sec').css({display:'none'});
    $('#dash-sec').css({display:'none'});
    $('#footer').css({display:'none'});
    $('#selectCustomerId').trigger('change');
    $('#selectItemCode').trigger('change');
})

$('#viewOrderDetailTable').on('click', 'tr', function () {

    let orderId = $(this).find(".o-orderId").text();
    let date = $(this).find(".o-date").text();
    let cusId = $(this).find(".o-cusId").text();
    let disRate = $(this).find(".o-discountRate").text();
    let discount = $(this).find(".o-discount").text();
    let subTotal = $(this).find(".o-subTotal").text();
    let balance = $(this).find(".o-balance").text();
    // let qty = $(this).find(".o-qty").text();
    // let dis = $(this).find(".o-dis").text();
    // let price = $(this).find(".o-price").text();

    clickOrderTableRow = $(this).index();

    $('#inputOrderId').val(orderId);
    $('#dateU').val(date);
    $('#-inputCusId').val(cusId);
    $('#rate').val(disRate);
    // $('#inputTelephone').val(cusTel);
    // $('#inputItemCode').val(code);
    // $('#inputItemName').val(iName);
    $('#inputDiscount').val(discount);
    $('#inputSubTotal').val(subTotal);
    $('#inputPrice').val(balance);

    $('#orderIdR').val(orderId);
    $('#inputCustomerIdR').val(cusId);
    // $('#itemNameRe').val(iName);
    $('#inputPriceR').val(balance);
});

$('#orderQTY').on('input', ()=>{
    let selectedValue = $('#orderQTY').val();
    orders.map(function (order){
        store.map(function (stores){
            if (stores.itemCode === order.itemCode){
                total = (selectedValue*stores.unitPrice);
                $('#inputPrice').val(total);
            }
        });
    });
    if (total < 8000){
        $('#inputDiscount').val(0);
        $('#rate').val(0);
    }
})

$('#rate').on('input',()=>{
    rate = $('#rate').val()

    total = parseFloat($('#inputPrice').val());

    if (total >= 8000){
        console.log("if Rate : " + rate);
        $('#inputDiscount').val(total*rate/100);
    }else {
        $('#inputDiscount').val('0.00');
    }
})

$('#updateOrderDetail').on('click' , ()=>{
    $('#updateOrderDetail').prop('disabled' , true);

    let orderId = $('#inputOrderId').val();
    let date = $('#dateU').val();
    let cusId = $('#-inputCustomerId').val();
    // let cusCity = $('#inputCityStore').val();
    // let cusTel = $('#inputTelephone').val();
    // let code = $('#inputItemCode').val();
    let disRate = $('#rate').val();
    let dis = $('#inputDiscount').val();
    let subTotal = $('#inputSubTotal').val();
    let price = $('#inputPrice').val();

    let OrderDTO = {
        orderID:orderId,
        date:date,
        cusId:cusId,
        discountRate:disRate,
        discount:dis,
        subTotal:subTotal,
        balance:price
    }

    valuesGetOrSendInDatabase("order" , "PUT" , "" , OrderDTO);
    // let orderDetail = orders[clickOrderTableRow]
    // orderDetail.orderId = orderId;
    // orderDetail.date = date;
    // orderDetail.cusName = cusName;
    // orderDetail.cusCity = cusCity;
    // orderDetail.cusTel = cusTel;
    // orderDetail.itemCode = code;
    // orderDetail.itemName = iName;
    // orderDetail.orderQTY = qty;
    // orderDetail.discount = dis;
    // orderDetail.unitPrice = price;
    loadTable();
    clearForm();
})

$('#removeOrder').on('click',()=>{
    $('#removeOrder').prop('disabled' , true);
    // orders.splice(clickOrderTableRow , 1);
    let orderId = $('#inputOrderId').val();

    let OrderDTO = {
        orderID:orderId
    }

    valuesGetOrSendInDatabase("order","DELETE","",OrderDTO);
    loadTable();
    clearForm();
})

function loadTable() {
    valuesGetOrSendInDatabase("order","GET","getData");
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

$(document).ready(function(){
    $("#dashStore").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#viewOrderDetailTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});

function clearForm(){
    $('#inputOrderId').val('');
    $('#inputCityStore').val('');
    $('#inputTelephone').val('');
    $('#inputItemCode').val('');
    $('#inputItemName').val('');
    $('#orderQTY').val('');
    $('#inputDiscount').val('');
    $('#inputPrice').val('');

    $('#orderIdR').val('');
    $('#inputCustomerIdR').val('');
    // $('#itemNameRe').val('');
    $('#inputPriceR').val('');
}

$(document).on('keydown', function(event) {
    if (event.key === "Tab" || event.keyCode === 9) {
        event.preventDefault();
    }
});

function validationModel(orderId,today,cId,discount,rate,subTotal,sPrice,btnId){
    (() => {
        'use strict'

        $('.cus-id').css({display: 'none'});
        // checkEmptyInputFields(cId,cName,cCity,cTel,btnId);

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('click', event => {

                $(orderId).on('input' , ()=>{
                    var id = $(orderId).val();

                    if (id.startsWith('O0-')) {
                        const numericPart = id.substring(3);

                        if (!(/^\d+$/.test(numericPart))) {
                            $('.o-idD').text('Order ID must be minimum 1 digit value followed by O0- format.');
                            $('.o-idD').css({ display: 'block' });
                            event.preventDefault();
                            event.stopPropagation();
                            checkOrderId = false;
                        } else {
                            $('.o-idD').css({ display: 'none' });
                            $(orderId).css({border:'1px solid green'});
                            checkOrderId = true;
                        }
                    } else {
                        $('.o-idD').css({ display: 'block' });
                        $(orderId).css({border:'1px solid red'});
                        event.preventDefault();
                        event.stopPropagation();
                        checkOrderId = false;
                    }
                    checkEmptyInputFields(orderId,today,cId,discount,rate,subTotal,sPrice,btnId);
                });

                $(today).change(function (){
                    var date = $(today).val();
                    var currentDate = new Date();

                    var year = currentDate.getFullYear();
                    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
                    var day = ("0" + currentDate.getDate()).slice(-2);

                    if (date === year+"-"+ month + "-" + day){
                        $('.o-dateD').css({ display: 'none' });
                        $(today).css({ border: '1px solid green' });
                        checkDate = true;
                    }else {
                        $('.o-dateD').css({ display: 'block' });
                        $(today).css({ border: '1px solid red' });
                        checkDate = false;
                    }
                    checkEmptyInputFields(orderId,today,cId,discount,rate,subTotal,sPrice,btnId);
                })

                $(cId).on('input' ,()=> {
                    var id = $(cId).val();

                    if(isDuplicated(id)){
                        $('.cus-id').text('Duplicate customer id. Please enter a unique customer id.');
                        $('.cus-id').css({ display: 'block' });
                        $(cId).css({ border: '1px solid red' });
                        checkCusId = false;
                    } else if (id.startsWith('C00-')) {
                        const numericPart = id.substring(6);

                        if (!(/^\d+$/.test(numericPart))) {
                            $('.cus-id').text('Customer ID must be minimum 3 digit value followed by C00- format.');
                            $('.cus-id').css({ display: 'block' });
                            $(cId).css({border:'1px solid red'});
                            event.preventDefault();
                            event.stopPropagation();
                            checkCusId = false;
                        } else {
                            $('.cus-id').css({ display: 'none' });
                            $(cId).css({border:'1px solid green'});
                            checkCusId = true;
                        }
                    } else {
                        $('.cus-id').css({ display: 'block' });
                        $(cId).css({border:'1px solid red'});
                        event.preventDefault();
                        event.stopPropagation();
                        checkCusId = false;
                    }
                    checkEmptyInputFields(orderId,today,cId,discount,rate,subTotal,sPrice,btnId)
                });

                $(subTotal).on('input' ,()=> {
                    var subT = $(subTotal).val();

                    if (subT.length <= 10 && /^[0-9.]+$/.test(subT)) {
                        $('.s-priceD').css({ display: 'none' });
                        $(subTotal).css({ border: '1px solid green' });
                        checkSubtotal = true;
                    } else {
                        $('.s-priceD').css({ display: 'block' });
                        $(sPrice).css({ border: '1px solid red' });
                        checkSubtotal = false;
                    }
                    checkEmptyInputFields(orderId,today,cId,discount,rate,subTotal,sPrice,btnId);
                });


                $(sPrice).on('input' ,()=> {
                    var price = $(sPrice).val();

                    if (price.length <= 10 && /^[0-9.]+$/.test(price)) {
                        $('.s-priceD').css({ display: 'none' });
                        $(sPrice).css({ border: '1px solid green' });
                        checkPrice = true;
                    } else {
                        $('.s-priceD').css({ display: 'block' });
                        $(sPrice).css({ border: '1px solid red' });
                        checkPrice = false;
                    }
                    checkEmptyInputFields(orderId,today,cId,discount,rate,subTotal,sPrice,btnId);
                });

                $(discount).on('input' ,()=> {
                    var price = $(discount).val();

                    if (price.length <= 10 && /^[0-9.]+$/.test(price)) {
                        $('.s-discountD').css({ display: 'none' });
                        $(discount).css({ border: '1px solid green' });
                        checkDis = true;
                    } else {
                        $('.s-discountD').css({ display: 'block' });
                        $(discount).css({ border: '1px solid red' });
                        checkDis = false;
                    }
                    checkEmptyInputFields(orderId,today,cId,discount,rate,subTotal,sPrice,btnId);
                });

                $(rate).on('input' ,()=> {
                    var rateDis = $(rate).val();

                    if (rateDis.length <= 3 && /^[0-9.]+$/.test(rateDis)) {
                        $('.s-discountRate').css({ display: 'none' });
                        $(rate).css({ border: '1px solid green' });
                        checkRate = true;
                    } else {
                        $('.s-discountRate').css({ display: 'block' });
                        $(rate).css({ border: '1px solid red' });
                        checkRate = false;
                    }
                    checkEmptyInputFields(orderId,today,cId,discount,rate,subTotal,sPrice,btnId);
                });
            }, false)
        })
    })()
}

function checkEmptyInputFields(checkOrderId,checkDate,checkCusId,checkRate,checkDis,checkSubtotal,checkPrice,btnId){
    if (checkOrderId && checkDate && checkCusId && checkRate && checkDis && checkSubtotal && checkPrice){
        $(btnId).prop('disabled' , false);
    }else {
        $(btnId).prop('disabled' , true);
    }
}