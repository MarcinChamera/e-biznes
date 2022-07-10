package dto

import play.api.libs.json.{Json, OFormat}

case class UpdateAuthorDto(
                          fullname: Option[String]
                        )

object UpdateAuthorDto {
  implicit val format: OFormat[UpdateAuthorDto] = Json.using[Json.WithDefaultValues].format[UpdateAuthorDto]
}