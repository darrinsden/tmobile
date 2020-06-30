import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store,public snackBar: MatSnackBar) {}

  removeFromReadingList(item) {

    this.store.dispatch(removeFromReadingList({ item }));
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    const snackBarRef = this.snackBar.open('Book removed from Reading List', 'Undo', config );
    
    snackBarRef.onAction().subscribe(() => {
      console.log('The snack-bar undo(remove) action was triggered!');
      console.log(item);
      const book = item as Book;
      this.store.dispatch(addToReadingList({ book }));
      snackBarRef.dismiss();
    });

  }
}
