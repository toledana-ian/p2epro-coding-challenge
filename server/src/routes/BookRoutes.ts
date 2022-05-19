import {Router} from 'express';
import {addBook, deleteBook, getBooks} from '../controllers/BookController';

const router = Router();

router.get('/books', getBooks);
router.post('/books', addBook);
router.delete('/books/:id', deleteBook);

export default router;