const BOOKSTORE_LOCALSTORAGE_KEY = 'bookstore_list';
import { rawBook } from './BooksList';

// helper to get user from localstorage
export function getStoredBookList(): rawBook[] | null {
  console.log('lendo de local storage');
  const storedBookList = localStorage.getItem(BOOKSTORE_LOCALSTORAGE_KEY);
  return storedBookList ? JSON.parse(storedBookList) : [];
}

export function setStoredBook(book: rawBook): void {
  let booklist = getStoredBookList() ?? [];
  if (booklist.length > 0) {
    console.log('armazenando no storage');
    booklist.push(book);

    //https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects

    booklist = booklist.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.id === value.id && t.title === value.title
      ))
    )
  } else {
    booklist = [book]
  }
  localStorage.setItem(BOOKSTORE_LOCALSTORAGE_KEY, JSON.stringify(booklist));

}

export function clearStoredBook(): void {
  localStorage.removeItem(BOOKSTORE_LOCALSTORAGE_KEY);
}