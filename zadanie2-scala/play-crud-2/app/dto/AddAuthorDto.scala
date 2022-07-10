
package dto

import play.api.libs.json.{Json, OFormat}

case class AddAuthorDto(
                       fullname: String
                     )

object AddAuthorDto {
  implicit val format: OFormat[AddAuthorDto] = Json.using[Json.WithDefaultValues].format[AddAuthorDto]
}