import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notBackground'
})
export class NotBackgroundPipe implements PipeTransform {

  
  transform(value: string): unknown {
    
    const newValue = './assets/images/default-background.jpg';

    return (!!value == false || value == null || value == 'null' || value.length === 0) ? (newValue) : (value);
  }

}
