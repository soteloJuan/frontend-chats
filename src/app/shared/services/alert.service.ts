import { Injectable }  from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class AlertService{ // FALTA CAMBIARLE LOS NOMBRE A TODAS LAS METODOS DE ALERTAS

    alertaSuccess(text: string){
        Swal.fire({
            position: 'center',
            icon: 'success',
            showConfirmButton: false,
            title: `${text}`,
            timer: 1000
        });
    }

    alertaError(){
        Swal.fire({
            position: 'center',
            icon: 'warning',
            showConfirmButton: false,
            title: 'ERROR!',
            timer: 1500
        });
    }
    alertaErrorWithMessage(text: any){
        Swal.fire({
            position: 'center',
            icon: 'warning',
            showConfirmButton: false,
            title: `${text}`,
            timer: 1500
        });
    }

    alertaQuestionDelete(text: string): any{
        return Swal.fire({
            title: 'Are You Sure ?',
            text: ` ${text}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,  Delete!'
        });
    }

    alertaQuestion(header: string, body: string, textConfirm: string){

        return Swal.fire({
            title: `${header}`,
            text: `${body}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `${textConfirm}`
        });
    }


    alertaWarning(text: string){
        Swal.fire({
            position: 'center',
            icon: 'warning',
            showConfirmButton: false,
            title: `${text}`,
            timer: 1500
        });
    }

    alertaNotication(message: string){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: false,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: 'info',
            title: `${message}`
        });
    }
    
    async alertUpdateImage(){

        const { value: file } = await Swal.fire({
            title: 'Select new image',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload your profile picture'
            },
            showCancelButton: true
        });

        return file;

    }

}
