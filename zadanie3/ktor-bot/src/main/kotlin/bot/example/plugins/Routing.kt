package bot.example.plugins

import com.slack.api.Slack
import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.response.*

val token: String = System.getenv("SLACK_TOKEN")
val slack: Slack = Slack.getInstance()

fun getListString(list: MutableList<String>): String {
    var result = ""
    for (i in 0 until list.size) {
        result += "${i+1}. ${list[i]}\n"
    }
    return result
}

fun getCategories(): String {
    val categories = mutableListOf<String>()
    categories.add("Mexican")
    categories.add("Thai")
    categories.add("Polish")
    categories.add("Italian")

    return getListString(categories)
}

fun getCategoryItems(categoryId: String?): String {
    val mexican = mutableListOf<String>()
    mexican.add("Burrito")
    mexican.add("Quesadilla")
    mexican.add("Tacos")

    val thai = mutableListOf<String>()
    thai.add("Pad Thai")
    thai.add("Spring Rolls")
    thai.add("Yellow Curry with Tofu")

    val polish = mutableListOf<String>()
    polish.add("Dumplings")
    polish.add("Bigos")
    polish.add("Cucumber soup")

    val italian = mutableListOf<String>()
    italian.add("Pizza")
    italian.add("Pasta")
    italian.add("Lasagne")

    return when (categoryId) {
        "1" -> getListString(mexican)
        "2" -> getListString(thai)
        "3" -> getListString(polish)
        "4" -> getListString(italian)
        else -> "Invalid cuisine number, pick another one."
    }
}

fun Application.configureRouting() {

    routing {
        post("/") {
            val response = slack.methods(token).chatPostMessage {
                it.channel("#kotlin")
                    .text("Welcome to 4th Dimension Restaurant! :wave: How can we help you?")
            }
            call.respondText("Response is: $response")
        }

        post("/categories") {
            val response = slack.methods(token).chatPostMessage {
                it.channel("#kotlin")
                    .text("Types of cuisine we serve:\n" + getCategories())
            }
            call.respondText("Response is: $response")
        }

        post("/categoryItems/{categoryId}") {
            val response = slack.methods(token).chatPostMessage {
                it.channel("#kotlin")
                    .text("Menu for the cuisine:\n" + getCategoryItems(call.parameters["categoryId"]))
            }
            call.respondText("Response is: $response")
        }
    }
}
