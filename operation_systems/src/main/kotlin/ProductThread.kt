class ProductThread(
    private val result: Array<Array<Double>>,
    private val lMatrix: Array<Array<Double>>,
    private val rMatrix: Array<Array<Double>>,
    private val row: Int
) : Runnable {
    override fun run() {
        for (i in rMatrix[0].indices) {
            result[row][i] = 0.0
            for (j in lMatrix[row].indices) {
                result[row][i] += lMatrix[row][j] * rMatrix[j][i]
            }
        }
    }
}