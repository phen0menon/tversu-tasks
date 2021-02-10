import kotlin.system.measureTimeMillis

fun main() {
    val lMatrix = generateDoubleMatrix(500, 500)
    val rMatrix = generateDoubleMatrix(500, 500)

    val measuredTimeUsingThreads = measureTimeMillis {
        val result = MatrixMultiplicator.multiply(lMatrix, rMatrix, 3)
//         showMatrix(result)
    }

    println()
    println("Measured time using threads is $measuredTimeUsingThreads")
    println()

    val measuredTimeUsingNaive = measureTimeMillis {
        val result = naiveProduct(lMatrix, rMatrix)
//         showMatrix(result)
    }

    println()
    println("Measured time using naive alg is $measuredTimeUsingNaive")


}