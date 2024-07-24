import { Component, Input } from '@angular/core';
import { IconDefinition, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  faStarEmpty = faStarEmpty;
  faStarHalfStroke = faStarHalfStroke;
  faStar = faStar;

  stars: IconDefinition[] = [];
  private _score: number = 0;

  @Input()
  set score(value: number) {
    this._score = value;
    this.updateStars();
  }

  ngOnChanges(): void {
    this.updateStars();
  }

  updateStars(): void {
    this.stars = [];
    const fullStars = Math.floor(this._score);
    const halfStars = this._score % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    for (let i = 0; i < fullStars; i++) {
      this.stars.push(faStar);
    }
    if (halfStars) {
      this.stars.push(faStarHalfStroke);
    }
    for (let i = 0; i < emptyStars; i++) {
      this.stars.push(faStarEmpty);
    }
  }

  // set score(val: number) {
  //   this._score = val > 5 ? 5 : val;
  //   const solidStarCount: number = Math.floor(this._score);
  //   for (let i: number = 0; i < solidStarCount; i++) {
  //     this.stars.push(faStar);
  //   }

  //   if (this._score - solidStarCount > 0 && this._score - solidStarCount < 1) {
  //     this.stars.push(faStarHalfStroke);
  //   }

  //   for (let i: number = this.stars.length; i < 5; i++) {
  //     this.stars.push(faStarEmpty);
  //   }
  // }
}
