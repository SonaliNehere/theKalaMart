import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollPositions: { [url: string]: number } = {};

  saveScrollPosition(url: string, scrollPosition: number) {
    this.scrollPositions[url] = scrollPosition;
  }

  getScrollPosition(url: string): number {
    return this.scrollPositions[url] || 0;
  }
}
