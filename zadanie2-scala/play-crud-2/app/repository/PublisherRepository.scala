package repository

import dto.UpdatePublisherDto
import model.Publisher

import javax.inject.{Inject, Singleton}
import scala.collection.mutable.ListBuffer

@Singleton
class PublisherRepository @Inject()() {
  private val publishers = new ListBuffer[Publisher]
  var idCounter = 1
  publishers.addOne(new Publisher(idCounter, "Drukarnia"))
  idCounter += 1

  def getAll: List[Publisher] = publishers.toList

  def getById(id: Int): Option[Publisher] = publishers.find(p => p.id == id)

  def add(name: String): Publisher = {
    val publisher = new Publisher(idCounter, name)
    idCounter += 1
    publishers.addOne(publisher)
    publisher
  }

  def delete(id: Int) = {
    val publisher = getById(id).getOrElse(throw new NoSuchElementException("Publisher not found"))
    publishers.remove(publishers.indexOf(publisher))
  }

  def update(id: Int, dto: UpdatePublisherDto) = {
    val publisher = getById(id).getOrElse(throw new NoSuchElementException("Publisher not found"))
    dto.name.foreach(newName => publisher.name = newName);
  }

  def checkIfExists(id: Int): Boolean = getById(id).isDefined

}
