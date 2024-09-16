class Responses {
    static ServerError(res, error = "Internal Server Error") {
        return res.status(500).send({ error })
    }
    static BadRequest(res, error = "Bad Request") {
        // return res.status(400).send({error})
        return res.send({ error, success: false })
    }
    static Success(res, data, message, code = 200) {
        return res.status(code).send({ data, message, success: true })
    }
    static UnprocessableEntity(res, error = "UnProcessable Entity Found") {
        return res.status(422).send({ error })
    }
    static NotFound(res, error = "Not Found") {
        // return res.status(404).send({ error })
        return res.send({ error })
    }
}

module.exports = Responses