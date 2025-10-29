import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber',
   standalone: true
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: number, decimals: number = 1): string {
    if (value == null) return '';

    if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(decimals) + 'B';
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(decimals) + 'M';
    if (value >= 1_000) return (value / 1_000).toFixed(decimals) + 'K';

    return value.toString();
  }
}
