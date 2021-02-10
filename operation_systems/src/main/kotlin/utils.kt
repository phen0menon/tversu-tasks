import kotlin.random.Random

fun generateDoubleMatrix(rows: Int, cols: Int) : Array<Array<Double>> {
    val result: Array<Array<Double>> = Array(rows) { Array(cols) { 0.0 } }
    for (i in 0 until rows) {
        result[i] = (1..cols).map{ Random.nextDouble() }.toTypedArray()
    }
    return result
}

fun generateEmptyDoubleMatrix(rows: Int, cols: Int): Array<Array<Double>> {
    return Array(rows) { Array(cols) { 0.0 } }
}

fun productRange(lMatrix: Array<Array<Double>>,
                 rMatrix: Array<Array<Double>>,
                 row: Int,
                 col: Int): Double {
    var result = 0.0
    for (i in lMatrix[row].indices) {
        result += lMatrix[row][i] * rMatrix[i][col]
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

fun showMatrix(matrix: Array<Array<Double>>) {
    for (i in matrix.indices) {
        for (j in matrix[i].indices) {
            print(matrix[i][j])
            print(" ")
        }
        println()
    }
}

fun getMatricesMeta(
    lMatrix: Array<Array<Double>>,
    rMatrix: Array<Array<Double>>): Triple<Int, Int, Int> {
    return Triple(
        lMatrix.size,
        rMatrix[0].size,
        lMatrix.size * rMatrix[0].size
    )
}