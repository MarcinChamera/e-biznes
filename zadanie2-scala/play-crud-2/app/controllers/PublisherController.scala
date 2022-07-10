package controllers

import dto.{AddPublisherDto, UpdatePublisherDto}
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents}
import repository.PublisherRepository

import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext

@Singleton
case class PublisherController @Inject()(publisherRepo: PublisherRepository, cc: ControllerComponents)(implicit exec: ExecutionContext) extends AbstractController(cc) {

  def showAll: Action[AnyContent] = Action {
    Ok(Json.toJson(publisherRepo.getAll))
  }

  def showById(id: Int): Action[AnyContent] = Action {
    val publisher = publisherRepo.getById(id)

    if (publisher.isDefined) {
      Ok(Json.toJson(publisher))
    } else {
      NotFound(s"Publisher with given id = $id not found")
    }
  }

  def add() = Action { implicit req =>
    val content = req.body
    val jsonObject = content.asJson
    val publisherDto: Option[AddPublisherDto] = jsonObject.flatMap(Json.fromJson[AddPublisherDto](_).asOpt)

    publisherDto match {
      case Some(newItem) =>
        val toBeAdded = publisherRepo.add(newItem.name)
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }

  def update(id: Int) = Action(parse.json) { implicit req =>
    req.body.validate[UpdatePublisherDto].map(
      dto => {
        try {
          publisherRepo.update(id, dto)
          Ok
        } catch {
          case e: Exception => BadRequest(e.getMessage)
        }
      }
    ).recoverTotal(_ => BadRequest("Bad request"))
  }


  def delete(id: Int): Action[AnyContent] = Action {
    try {
      publisherRepo.delete(id)
      Ok
    } catch {
      case e: Exception => BadRequest(e.getMessage)
    }
  }

}