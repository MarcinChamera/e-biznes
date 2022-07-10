package repository

import dto.UpdateAuthorDto
import model.Author

import javax.inject.{Inject, Singleton}
import scala.collection.mutable.ListBuffer

@Singleton
class AuthorRepository @Inject()() {
  private val authors = new ListBuffer[Author]
  var idCounter = 1
  authors.addOne(new Author(idCounter, "Aldous Huxley"))
  idCounter += 1

  def getAll: List[Author] = authors.toList

  def getById(id: Int): Option[Author] = authors.find(a => a.id == id)

  def add(fullname: String): Author = {
    val author = new Author(idCounter, fullname)
    idCounter += 1
    authors.addOne(author)
    author
  }

  def delete(id: Int) = {
    val author = getById(id).getOrElse(throw new NoSuchElementException("Author not found"))
    authors.remove(authors.indexOf(author))
  }

  def update(id: Int, dto: UpdateAuthorDto) = {
    val author = getById(id).getOrElse(throw new NoSuchElementException("Author not found"))
    dto.fullname.foreach(newFullname => author.fullname = newFullname);
  }

  def checkIfExists(id: Int): Boolean = getById(id).isDefined
}
