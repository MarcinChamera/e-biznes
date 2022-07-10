package controllers

import dto.{AddAuthorDto, AddBookDto, UpdateBookDto}
import play.api.libs.json.{JsValue, Json}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, Request}
import repository.{AuthorRepository, BookRepository, PublisherRepository}

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext

@Singleton
case class BookController @Inject()(bookRepo: BookRepository, authorRepo: AuthorRepository, publisherRepo: PublisherRepository, cc: ControllerComponents)(implicit exec: ExecutionContext) extends AbstractController(cc) {

  def showAll: Action[AnyContent] = Action {
    Ok(Json.toJson(bookRepo.getAll))
  }

  def showById(id: Int): Action[AnyContent] = Action {
    val book = bookRepo.getById(id)

    if (book.isDefined) {
      Ok(Json.toJson(book))
    } else {
      NotFound(s"Book with given id = $id not found")
    }
  }

  def add() = Action { implicit req =>
    val content = req.body
    val jsonObject = content.asJson
    val bookDto: Option[AddBookDto] = jsonObject.flatMap(Json.fromJson[AddBookDto](_).asOpt)

    bookDto match {
      case Some(newItem) =>
        val toBeAdded = bookRepo.add(newItem.title, newItem.authorId, newItem.publisherId)
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }

//  def update(id: Int) = Action(parse.json) { implicit req =>
//    req.body.validate[UpdateBookDto].map(
//      dto => {
//        try {
//          val authorIdCondition = dto.authorId.isDefined && !authorRepo.checkIfExists(dto.authorId.get)
//          val publisherIdCondition = dto.publisherId.isDefined && !publisherRepo.checkIfExists(dto.publisherId.get)
//          if (authorIdCondition || publisherIdCondition) {
//            if (authorIdCondition) {
//              BadRequest(s"Author with id = ${dto.authorId.get} not found")
//            }
//            if (publisherIdCondition) {
//              BadRequest(s"Publisher with id = ${dto.publisherId.get} not found")
//            }
//          } else {
//            bookRepo.update(id, dto)
//            Ok
//          }
//        } catch {
//          case e: Exception => BadRequest(e.getMessage)
//        }
//      }
//    ).recoverTotal(_ => BadRequest("Bad request"))
//  }

  def delete(id: Int): Action[AnyContent] = Action {
    try {
      bookRepo.delete(id)
      Ok
    } catch {
      case e: Exception => BadRequest(e.getMessage)
    }
  }

}