package model

import play.api.libs.json.{Json, OFormat}

case class Author(
                 id: Int,
                 var fullname: String
                 )

object Author {
  implicit val authorFormat: OFormat[Author] = Json.using[Json.WithDefaultValues].format[Author]
}
