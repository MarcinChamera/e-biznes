
package dto

import play.api.libs.json.{Json, OFormat}

case class AddPublisherDto(
                         name: String
                       )

object AddPublisherDto {
  implicit val format: OFormat[AddPublisherDto] = Json.using[Json.WithDefaultValues].format[AddPublisherDto]
}