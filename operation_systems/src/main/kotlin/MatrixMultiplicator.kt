class MatrixMultiplicator {
    companion object {
        fun multiply(
            lMatrix: Array<Array<Double>>,
            rMatrix: Array<Array<Double>>,
            threadsAmount: Int = Runtime.getRuntime().availableProcessors()
        ): Array<Array<Double>> {
            val result = generateEmptyDoubleMatrix(lMatrix.size, rMatrix[0].size)
            val (_, cols, cells) = getMatricesMeta(lMatrix, rMatrix)
            val cellsPerThread = cells / threadsAmount

            val threads = (0 until threadsAmount).map { iThread ->
                Thread {
                    val threadCells = iThread * cellsPerThread
                    var currRow = threadCells / cols
                    var currCol = threadCells % cols

                    while (currRow * cols + currCol - 1 < threadCells + cellsPerThread) {
                        result[currRow][currCol] = productRange(lMatrix, rMatrix, currRow, currCol)
                        if (++currCol >= cols) {
                            currCol = 0
                            currRow++
                        }
                    }
                }
            }

            threads.forEach(Thread::start).also {
                threads.forEach { thread ->
                    run {
                        try {
                            thread.join()
                        } catch (e: InterruptedException) {
                            e.printStackTrace()
                        }
                    }
                }
            }


            return result
        }
    }
}