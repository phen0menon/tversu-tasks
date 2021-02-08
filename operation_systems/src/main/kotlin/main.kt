fun main() {
    val lMatrix = generateDoubleMatrix(400, 400)
    val rMatrix = generateDoubleMatrix(400, 400)

    countIt {
        ProductController.multiply(
            lMatrix,
            rMatrix,
            10
        )
    }

    countIt {
        naiveProduct(lMatrix, rMatrix)
    }
}