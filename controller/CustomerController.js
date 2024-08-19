import Customer from "../model/Customer.js";
import {customer, store} from "../db/DB.js"

let clickTableRow = 0;

let checkId = false;
let checkName = false;
let checkCity = false;
let checkTel = false;

let cId = $('#inputCustomerIdU').val();
let cName = $('#inputCustomerNameU').val();
let cCity = $('#inputCityU').val();
let cTel = $('#inputTelephoneU').val();

window.onload = loadTable();

$('#submitC').on('click' , ()=>{
    console.log("click cus");
    
    event.preventDefault();

    $('#submitC').prop('disabled' , true);

    checkId = false;
    checkName = false;
    checkCity = false;
    checkTel = false;

    let cId = $('#-inputCustomerId').val();
    let cName = $('#_inputCustomerName').val();
    let city = $('#inputCityC').val();
    let tel = $('#inputTelephoneC').val();

    const CustomerDTO = {
        id : cId,
        name : cName,
        city : city,
        tel : tel
    }

    console.log(CustomerDTO);
    valuesGetOrSendInDatabase(CustomerDTO,"POST");
    loadTable();

    // let customerDetail = new Customer(cId,cName,city,tel)
    // customer.push(customerDetail);


    // $('#selectCustomerId').append($('<option>').text(cId)); // place order customer id comboBox set customer code

    // if (customer.length < 10){
    //     $('#customer').text("0"+ customer.length);
    // }else {
    //     $('#customer').text(customer.length);
    // }
     clearForm()
})

$('#updateC').on('click' , ()=>{
    event.preventDefault();
    let id = $('#inputCustomerIdU').val();
    let cName = $('#inputCustomerNameU').val();
    let city = $('#inputCityU').val();
    let tel = $('#inputTelephoneU').val();

    const CustomerDTO = {
        id : id,
        name : cName,
        city : city,
        tel : tel
    }
    
    valuesGetOrSendInDatabase(CustomerDTO,"PUT");

    loadTable()
    clearForm()
    $('#updateC').prop('disabled' , true);
});

$('#deleteC').on('click',()=>{
    let cId = $('#inputCustomerId').val();

    let CustomerDTO = {
        id : cId
    }
    valuesGetOrSendInDatabase(CustomerDTO,"DELETE");

    $('#selectCustomerId').empty();

    for (let i = 0; i < customer.length; i++) {
        $('#selectCustomerId').append($('<option>').text(customer[i].id));
    }

    $('#deleteC').prop('disabled' , true);

    loadTable()
    clearForm()
});

function loadTable(){
    valuesGetOrSendInDatabase("","GET","getData");
}

function valuesGetOrSendInDatabase(CustomerDTO , methodType , getVal){
    
    const JsonDTO = JSON.stringify(CustomerDTO);
  
    const http = new XMLHttpRequest();
    http.onreadystatechange =() =>{
        if (http.readyState == 4) {
            if (http.status == 200) {
                var jsonTypeResp = JSON.stringify(http.responseText);   
                if (getVal === "getData") {
                    const customerDetails = JSON.parse(http.responseText);

                    $('#customerTable').empty();                
                    customerDetails.map(customer => {
                       let record = `<tr> 
                                        <td class ="c-id orderTableBody">${customer.id}</td>
                                        <td class ="c-name orderTableBody">${customer.name}</td>
                                        <td class ="c-city orderTableBody">${customer.city}</td>
                                        <td class ="c-tel orderTableBody">${customer.tel}</td>
                                    </tr>`;
                        $('#customerTable').append(record);
                    });  
                }else{
                    console.log(jsonTypeResp);
                } 
            }else{
                console.error("Failed");
                console.error("Status Received" , http.status);
                console.error("Processing Stage" , http.readyState);
            }
        }else{
            console.log("Processing stage", http.readyState);
        }
    }
    http.open(`${methodType}`,"http://localhost:8080/groStore_pos_system_back_end_war_exploded/customer",true);
    if (getVal === "getData") {
        http.send(); 
    }else{
        http.setRequestHeader("Content-Type","application/json");
        http.send(JsonDTO);  
    }
}

$('#customerTable').on('click', 'tr', function () {

    let id = $(this).find(".c-id").text();
    let name = $(this).find(".c-name").text();
    let city = $(this).find(".c-city").text();
    let tel = $(this).find(".c-tel").text();

    clickTableRow = $(this).index();

    $('#inputCustomerIdU').val(id);
    $('#inputCustomerNameU').val(name);
    $('#inputCityU').val(city);
    $('#inputTelephoneU').val(tel);

    $('#inputCustomerId').val(id);
    $('#inputCustomerName').val(name);
})

$(document).ready(function(){
    $("#inputSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#customerTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

function clearForm(){
    $('#-inputCustomerId').val("")
    $('#_inputCustomerName').val("")
    $('#inputCityC').val("")
    $('#inputTelephoneC').val("")

    $('#inputCustomerIdU').val("")
    $('#inputCustomerNameU').val("")
    $('#inputCityU').val("")
    $('#inputTelephoneU').val("")

    $('#inputCustomerId').val("")
    $('#inputCustomerName').val("")
}

$('#newModalCus').on('shown.bs.modal', function() {
    $('#submitC').prop('disabled',true);
    validation('#-inputCustomerId','#_inputCustomerName','#inputCityC','#inputTelephoneC','#submitC')
});

$('#updateModalCus').on('shown.bs.modal', function() {
    checkEmptyFieldUpdateModal('#updateC');
    validation('#inputCustomerIdU','#inputCustomerNameU','#inputCityU','#inputTelephoneU','#updateC')
});

$('#removeModal').on('shown.bs.modal', function() {
    $('#inputCustomerId').prop('disabled' , true);
    $('#inputCustomerName').prop('disabled' , true);
    checkEmptyFieldRemoveModal('#deleteC');
});

function checkEmptyFieldUpdateModal(btn){
     cId = $('#inputCustomerIdU').val();
     cName = $('#inputCustomerNameU').val();
     cCity = $('#inputCityU').val();
     cTel = $('#inputTelephoneU').val();

     if (cId == '' && cName == '' && cCity == '' && cTel == ''){
         $(btn).prop('disabled' , true);
     }else {
         $(btn).prop('disabled' , false);

         checkId = true;
         checkName = true;
         checkCity = true;
         checkTel = true;
     }
}

function checkEmptyFieldRemoveModal(btn){
     cId = $('#inputCustomerId').val();
     cName = $('#inputCustomerName').val();

     if (cId == '' && cName == ''){
         $(btn).prop('disabled' , true);
     }else {
         $(btn).prop('disabled' , false);

         checkId = true;
         checkName = true;
         checkCity = true;
         checkTel = true;
     }
}

function validation(cId,cName,cCity,cTel,btnId){
    (() => {
         'use strict'

         // Fetch all the forms we want to apply custom Bootstrap validation styles to
         const forms = document.querySelectorAll('.needs-validation')

         // Loop over them and prevent submission
         Array.from(forms).forEach(form => {
            form.addEventListener('click', event => {

                $(cId).on('input' , ()=>{
                    var id = $(cId).val();

                    if(isDuplicated(id)){
                        $('.c-id').text('Duplicate customer id. Please enter a unique customer id.');
                        $('.c-id').css({ display: 'block' });
                        $(cId).css({ border: '1px solid red' });
                        checkId = false;
                    } else if (id.startsWith('C00-')) {
                        const numericPart = id.substring(6);

                        if (!(/^\d+$/.test(numericPart))) {
                            $('.c-id').text('Customer ID must be minimum 3 digit value followed by C00- format.');
                            $('.c-id').css({ display: 'block' });
                            $(cId).css({border:'1px solid red'});
                            event.preventDefault();
                            event.stopPropagation();
                            checkId = false;
                        } else {
                            $('.c-id').css({ display: 'none' });
                            $(cId).css({border:'1px solid green'});
                            checkId = true;
                        }
                    } else {
                        $('.c-id').css({ display: 'block' });
                        $(cId).css({border:'1px solid red'});
                        event.preventDefault();
                        event.stopPropagation();
                        checkId = false;
                    }
                    checkEmptyInputFields(checkId,checkName,checkCity,checkTel,btnId);
                });

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
                    checkEmptyInputFields(checkId,checkName,checkCity,checkTel,btnId);
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
                    checkEmptyInputFields(checkId,checkName,checkCity,checkTel,btnId);
                });

                $(cTel).on('input' ,()=> {
                    var tel = $(cTel).val();

                    if (tel.length === 10 && /^[0-9]+$/.test(tel)) {
                        $('.c-tel').css({ display: 'none' });
                        $(cTel).css({ border: '1px solid green' });
                        checkTel = true;
                    } else {
                        $('.c-tel').css({ display: 'block' });
                        $(cTel).css({ border: '1px solid red' });
                        checkTel = false;
                    }
                    checkEmptyInputFields(checkId,checkName,checkCity,checkTel,btnId);
                });

                $(btnId).on('click',()=>{
                    clearBorderColor(cId,cName,cCity,cTel);
                })
            }, false)
         })
    })()
}

function checkEmptyInputFields(cId,cName,cCity,cTel,btnId){

    if (cId && cName && cCity && cTel){
        $(btnId).prop('disabled' , false);
    }else {
        $(btnId).prop('disabled' , true);
    }
}

function clearBorderColor(id,name,city,tel){
    $(id).css({ border: '1px solid #cfcfcf'});
    $(name).css({ border: '1px solid #cfcfcf'});
    $(city).css({ border: '1px solid #cfcfcf'});
    $(tel).css({ border: '1px solid #cfcfcf'});
}

function isDuplicated(id){
    for (let i = 0; i < customer.length; i++) {
        if (customer[i].id === id){
            return true;
        }
    }
    return false;
}