package model

import play.api.libs.json.{Json, OFormat}

case class Book(
               id: Int,
               var title: String,
               var authorId: Int,
               var publisherId: Int
               )

object Book {
  implicit val bookFormat: OFormat[Book] = Json.using[Json.WithDefaultValues].format[Book]
}