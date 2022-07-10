package dto

import play.api.libs.json.{Json, OFormat}

case class UpdatePublisherDto(
                            name: Option[String]
                          )

object UpdatePublisherDto {
  implicit val format: OFormat[UpdatePublisherDto] = Json.using[Json.WithDefaultValues].format[UpdatePublisherDto]
}