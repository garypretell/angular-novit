import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-password-strength-bar',
  templateUrl: './password-strength-bar.component.html',
  styleUrls: ['./password-strength-bar.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PasswordStrengthBarComponent implements OnChanges {
  @Input() passwordToCheck!: string;
  @Output() checkValue = new EventEmitter();
  bar0!: string;
  bar1!: string;
  bar2!: string;
  bar3!: string;
  bar4!: string;

  private colors = ['#dc2626', '#f87171', '#fde047', '#d9f99d', '#a3e635'];

  private static measureStrength(pass: string) {
    let score = 0;
    // award every unique letter until 5 repetitions
    let letters: any = {};
    for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }
    // bonus points for mixing it up
    let variations: any = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
    };

    let variationCount = 0;
    for (let check in variations) {
      variationCount += variations[check] ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    return Math.trunc(score);
  }

  private getColor(score: number) {
    let idx = 0;
    if (score > 90) {
      idx = 4;
    } else if (score > 70) {
      idx = 3;
    } else if (score >= 40) {
      idx = 2;
    } else if (score >= 20) {
      idx = 1;
    }
    return {
      idx: idx + 1,
      col: this.colors[idx],
    };
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    var password = changes['passwordToCheck'].currentValue;
    this.setBarColors(5, '#DDD');
    if (password) {
      let c = this.getColor(PasswordStrengthBarComponent.measureStrength(password));
      this.checkValue.emit(c.idx);
      this.setBarColors(c.idx, c.col);
    }
  }

  private setBarColors(count: any, col: string) {
    for (let _n = 0; _n < count; _n++) {
      (this as any)['bar' + _n] = col;
    }
  }
}
