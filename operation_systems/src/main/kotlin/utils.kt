import kotlin.random.Random

fun countIt(lambda: () -> Unit) {
    val start = System.currentTimeMillis()
    lambda()
    val end = System.currentTimeMillis()
    println(end - start)
}

fun generateDoubleMatrix(rows: Int, cols: Int) : Array<Array<Double>> {
    val result: Array<Array<Double>> = Array(rows) { Array(cols) { 0.0 } }
    for (i in 0 until rows) {
        result[i] = (1..cols).map{ Random.nextDouble() }.toTypedArray()
    }
    return result
}

fun naiveProduct(
    lMatrix: Array<Array<Double>>,
    rMatrix: Array<Array<Double>>): Array<Array<Double>> {
    val result = Array(lMatrix.size) { Array(rMatrix[0].size) { 0.0 } }
    for (i in lMatrix[0].indices) {
        for (j in rMatrix[0].indices) {
            result[i][j] = 0.0
            for (k in lMatrix[0].indices) {
                result[i][j] += lMatrix[i][k] * rMatrix[k][j]
            }
        }
    }
    return result
}