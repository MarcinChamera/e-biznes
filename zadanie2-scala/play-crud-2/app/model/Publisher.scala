package model

import play.api.libs.json.{Json, OFormat}

case class Publisher(
                 id: Int,
                 var name: String
               )

object Publisher {
  implicit val publisherFormat: OFormat[Publisher] = Json.using[Json.WithDefaultValues].format[Publisher]
}