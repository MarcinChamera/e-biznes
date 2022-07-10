package controllers

import dto.{AddAuthorDto, UpdateAuthorDto}
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import repository.AuthorRepository

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext

@Singleton
case class AuthorController @Inject() (authorRepo: AuthorRepository, cc: ControllerComponents)(implicit exec: ExecutionContext) extends AbstractController(cc) {

  def showAll: Action[AnyContent] = Action {
    Ok(Json.toJson(authorRepo.getAll))
  }

  def showById(id: Int): Action[AnyContent] = Action {
    val author = authorRepo.getById(id)

    if (author.isDefined) {
      Ok(Json.toJson(author))
    } else {
      NotFound(s"Author with given id = $id not found")
    }
  }

  def add() = Action { implicit req =>
  val content = req.body
  val jsonObject = content.asJson
  val authorDto: Option[AddAuthorDto] = jsonObject.flatMap(Json.fromJson[AddAuthorDto](_).asOpt)

  authorDto match {
    case Some(newItem) =>
      val toBeAdded = authorRepo.add(newItem.fullname)
      Created(Json.toJson(toBeAdded))
    case None =>
      BadRequest
  }
}

  def update(id: Int) = Action(parse.json) { implicit req =>
    req.body.validate[UpdateAuthorDto].map(
      dto => {
        try {
            authorRepo.update(id, dto)
            Ok
        } catch {
          case e: Exception => BadRequest(e.getMessage)
        }
      }
    ).recoverTotal(_ => BadRequest("Bad request"))
  }


  def delete(id: Int): Action[AnyContent] = Action {
    try {
      authorRepo.delete(id)
      Ok
    } catch {
      case e: Exception => BadRequest(e.getMessage)
    }
  }

}