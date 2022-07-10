package dto

import play.api.libs.json.{Json, OFormat}

case class UpdateBookDto(
                            title: Option[String],
                            authorId: Option[Int],
                            publisherId: Option[Int]
                          )

object UpdateBookDto {
  implicit val format: OFormat[UpdateBookDto] = Json.using[Json.WithDefaultValues].format[UpdateBookDto]
}