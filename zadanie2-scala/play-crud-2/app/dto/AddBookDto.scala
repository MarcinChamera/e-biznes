package dto

import play.api.libs.json.{Json, OFormat}

case class AddBookDto(
                       title: String,
                       authorId: Int,
                       publisherId: Int
                       )

object AddBookDto {
  implicit val format: OFormat[AddBookDto] = Json.using[Json.WithDefaultValues].format[AddBookDto]
}