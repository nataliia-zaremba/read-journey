import api from "./auth";

// Типи для книг
export interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
}

export interface BooksResponse {
  results: Book[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface GetBooksParams {
  page?: number;
  limit?: number;
  title?: string;
  author?: string;
}

// API методи для книг
export const booksAPI = {
  // Отримати рекомендовані книги
  getRecommended: async (
    params: GetBooksParams = {}
  ): Promise<BooksResponse> => {
    const { page = 1, limit = 10, title = "", author = "" } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (title) queryParams.append("title", title);
    if (author) queryParams.append("author", author);

    const response = await api.get(
      `/books/recommend?${queryParams.toString()}`
    );
    return response.data;
  },

  // Додати книгу до бібліотеки
  addBook: async (bookId: string): Promise<void> => {
    await api.post("/books/add", { id: bookId });
  },
};
