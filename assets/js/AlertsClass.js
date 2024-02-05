import { FuncsClass } from "./FuncsClass.js";

const fc = new FuncsClass();

const {isNil} = fc;

class AlertsClass{
    constructor(){}


    simpleAlert(data = {}){

        return Swal.fire({
            title: isNil(data?.title) === false ? data.title : '',
            text: isNil(data?.text) === false ? data.text : '',
            icon: isNil(data?.icon) === false ? data.icon : '',
            confirmButtonText: isNil(data?.confirmButtonText) === true ? 'Ok' : data.confirmButtonText,
          })
    }

    simpleAlertTimer (data = {}) {

        const alertMessageHtml = `
        <p class="f-700 mb-0 text-center text-primary">
            ${isNil(data?.title) === false ? data.title : ""}
        </p>`;
        
        return Swal.fire({
            width: isNil(data?.width) === false ? data.width : "300",
            position: isNil(data?.position) === false ? data.position : "top-end",
            icon: isNil(data?.icon) === false ? data.icon : "",
            // title: isNil(data?.title) === false ? data.title : "",
            html: alertMessageHtml,
            showConfirmButton: isNil(data?.showConfirmButton) === false ? data.showConfirmButton : false,
            timer: isNil(data?.timer) === false ? data.timer : 1500,
            timerProgressBar: true,
          });
    }

}


export {
    AlertsClass
}