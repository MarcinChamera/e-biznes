package repository

import dto.UpdateBookDto
import model.{Book}

import javax.inject.{Inject, Singleton}
import scala.collection.mutable.ListBuffer

@Singleton
class BookRepository @Inject()() {
  private val books = new ListBuffer[Book]
  var idCounter = 1
  books.addOne(new Book(idCounter, "Nowy wspanialy swiat", 1, 1))
  idCounter += 1

  def getAll: List[Book] = books.toList

  def getById(id: Int): Option[Book] = books.find(b => b.id == id)

  def add(title: String, authorId: Int, publisherId: Int): Book = {
    val book = new Book(idCounter, title, authorId, publisherId)
    idCounter += 1
    books.addOne(book)
    book
  }

  def delete(id: Int) = {
    val book = getById(id).getOrElse(throw new NoSuchElementException("Book not found"))
    books.remove(books.indexOf(book))
  }

  def update(id: Int, dto: UpdateBookDto) = {
    val book = getById(id).getOrElse(throw new NoSuchElementException("Book not found"))
    dto.title.foreach(newTitle => book.title = newTitle);
    dto.authorId.foreach(newAuthorId => book.authorId = newAuthorId);
    dto.publisherId.foreach(newPublisherId => book.publisherId = newPublisherId);
  }

  def checkIfExists(id: Int): Boolean = getById(id).isDefined
}
