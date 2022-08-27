import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notImage'
})
export class NotImagePipe implements PipeTransform {

  
  transform(value: string): unknown {
    
    const newValue = './assets/images/not-image.png';

    return (!!value == false || value == null || value == 'null' || value.length === 0) ? (newValue) : (value);
  }

}
